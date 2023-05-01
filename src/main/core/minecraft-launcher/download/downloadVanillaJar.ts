import fs from 'fs';
import downloadFile from './downloadFile';
import {
  DownloadVanillaJarCallbacks,
  DownloadVanillaJarParams,
  DownloadVanillaJarResult,
} from './types';

export default async function downloadVanillaJar(
  { minecraftRoot, versionId, size, url }: DownloadVanillaJarParams,
  callbacks?: DownloadVanillaJarCallbacks
): Promise<DownloadVanillaJarResult> {
  const dir = `${minecraftRoot}\\versions\\${versionId}`;
  const path = `${dir}\\${versionId}.jar`;

  if (fs.existsSync(path)) {
    if (callbacks?.onFoundExisting) {
      callbacks.onFoundExisting({ versionId, path, size });
    }

    return { path };
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.openSync(path, 'w');

  return new Promise<DownloadVanillaJarResult>((resolve, reject) => {
    if (callbacks?.onDownloadStart) {
      callbacks.onDownloadStart({ versionId, path, size });
    }

    downloadFile(path, url)
      .then((downloadedPath) => {
        if (downloadedPath) {
          if (callbacks?.onDownloadFinish) {
            callbacks.onDownloadFinish({ versionId, path, size });
          }

          return resolve({ path });
        }

        const e = new Error('Could not download vanilla jar');

        if (callbacks?.onError) {
          callbacks.onError({ path, size, versionId }, e);
        }

        return reject(e);
      })
      .catch((e) => {
        if (callbacks?.onError) {
          callbacks.onError({ path, size, versionId }, e);
        }

        reject(e);
      });
  });
}
