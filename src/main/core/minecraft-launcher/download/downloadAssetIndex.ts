import fs from 'fs';
import downloadFile from './downloadFile';
import {
  DownloadAssetIndexCallbacks,
  DownloadAssetIndexParams,
  DownloadAssetIndexResult,
} from './types';

export default async function downloadAssetIndex(
  { minecraftRoot, id, url }: DownloadAssetIndexParams,
  callbacks?: DownloadAssetIndexCallbacks
): Promise<DownloadAssetIndexResult> {
  const dir = `${minecraftRoot}\\assets\\indexes\\`;
  const path = `${minecraftRoot}\\assets\\indexes\\${id}.json`;

  if (fs.existsSync(path)) {
    if (callbacks?.onFoundExisting) {
      callbacks.onFoundExisting({ path, assetIndexId: id });
    }

    return { path };
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise<DownloadAssetIndexResult>((resolve, reject) => {
    if (callbacks?.onDownloadStart) {
      callbacks.onDownloadStart({ path, assetIndexId: id });
    }

    downloadFile(path, url)
      .then((downloadedPath) => {
        if (downloadedPath) {
          if (callbacks?.onDownloadFinish) {
            callbacks.onDownloadFinish({
              path: downloadedPath,
              assetIndexId: id,
            });
          }

          return resolve({ path: downloadedPath });
        }

        const e = new Error('Could not download assetIndex');

        if (callbacks?.onError) {
          callbacks.onError({ assetIndexId: id, path }, e);
        }

        return reject(e);
      })
      .catch((e) => {
        if (callbacks?.onError) {
          callbacks.onError(
            {
              assetIndexId: id,
              path,
            },
            e
          );
        }

        reject(e);
      });
  });
}
