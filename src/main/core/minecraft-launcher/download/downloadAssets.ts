import fs from 'fs';
import crypto from 'crypto';
import Bottleneck from 'bottleneck';
import downloadFile from './downloadFile';
import {
  DownloadAssetCallbacks,
  DownloadAssetParams,
  DownloadAssetResult,
  DownloadAssetsParams,
  DownloadAssetsResult,
} from './types';

export async function downloadAsset(
  { assetsRoot, asset }: DownloadAssetParams,
  callbacks?: DownloadAssetCallbacks
): Promise<DownloadAssetResult> {
  const { name, hash, size, dirName } = asset;

  const dir = `${assetsRoot}\\${dirName}\\${hash.slice(0, 2)}`;
  const path = `${dir}\\${hash}`;
  const url = `https://resources.download.minecraft.net/${hash.slice(
    0,
    2
  )}/${hash}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const file = fs.openSync(path, 'w');

  return new Promise<DownloadAssetResult>((resolve, reject) => {
    if (callbacks?.onDownloadStart) {
      callbacks.onDownloadStart({
        name,
        hash,
        size,
        path,
      });
    }

    downloadFile(path, url)
      .then((downloadedPath) => {
        fs.closeSync(file);
        if (!downloadedPath) {
          const e = new Error(`Could not download asset ${path}`);

          if (callbacks?.onError) {
            callbacks.onError({ hash, name, path, size }, e);
          }

          return reject();
        }

        if (callbacks?.onDownloadFinish) {
          callbacks.onDownloadFinish({
            name,
            hash,
            size,
            path: downloadedPath,
          });
        }

        return resolve({ path: downloadedPath });
      })
      .catch((e) => {
        fs.closeSync(file);
        if (callbacks?.onError) {
          callbacks.onError({ hash, name, path, size }, e);
        }

        reject(e);
      });
  });
}

const limiter = new Bottleneck({
  maxConcurrent: 200,
});

function scheduleDownload(
  params: DownloadAssetParams,
  callbacks?: DownloadAssetCallbacks
) {
  return limiter.schedule(() => downloadAsset(params, callbacks));
}

export default async function downloadAssets(
  { minecraftRoot, assetIndex }: DownloadAssetsParams,
  callbacks?: DownloadAssetCallbacks
): Promise<DownloadAssetsResult> {
  const assetsRoot = `${minecraftRoot}\\assets`;
  const assets: DownloadAssetParams['asset'][] = [];

  Object.entries(assetIndex).forEach(([assetGroupName, assetGroupValue]) => {
    Object.entries(assetGroupValue).forEach(([assetName, assetValue]) => {
      assets.push({
        dirName: assetGroupName,
        name: assetName,
        hash: assetValue.hash,
        size: assetValue.size,
      });
    });
  });

  const filteredAssets = assets.filter((asset) => {
    const dir = `${assetsRoot}\\${asset.dirName}\\${asset.hash.slice(0, 2)}`;
    const path = `${dir}\\${asset.hash}`;

    if (fs.existsSync(path)) {
      const file = fs.readFileSync(path);
      const hashSum = crypto.createHash('sha1');

      hashSum.update(file);

      if (hashSum.digest('hex') === asset.hash) {
        if (callbacks?.onFoundExisting) {
          callbacks.onFoundExisting({
            name: asset.name,
            hash: asset.hash,
            path,
            size: asset.size,
          });
        }

        return false;
      }
    }

    return true;
  });

  await Promise.all<DownloadAssetResult>(
    filteredAssets.map((asset) =>
      scheduleDownload({ asset, assetsRoot }, callbacks)
    )
  );

  return { assetsRoot };
}
