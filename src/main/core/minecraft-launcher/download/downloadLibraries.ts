import fs from 'fs';
import { MinecraftArtifact } from 'renderer/entities/minecraft-version';
import Bottleneck from 'bottleneck';
import downloadFile from './downloadFile';
import {
  DownloadLibrariesParams,
  DownloadLibrariesResult,
  DownloadLibraryCallbacks,
  DownloadLibraryParams,
  DownloadLibraryResult,
} from './types';

export async function downloadNative(
  {
    minecraftRoot,
    native,
  }: {
    minecraftRoot: string;
    native: MinecraftArtifact;
  },
  callbacks?: DownloadLibraryCallbacks
): Promise<DownloadLibraryResult> {
  const nativePath = native.path.split('/');
  const dir = `${minecraftRoot}\\libraries\\${nativePath
    .slice(0, -1)
    .join('\\')}`;
  const path = `${dir}\\${nativePath.at(-1)}`;

  if (fs.existsSync(path)) {
    if (callbacks?.onFoundExisting) {
      callbacks.onFoundExisting({
        path,
        size: native.size,
      });
    }

    return { path };
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.openSync(path, 'w');

  return new Promise<DownloadLibraryResult>((resolve, reject) => {
    if (callbacks?.onDownloadStart) {
      callbacks.onDownloadStart({
        path,
        size: native.size,
      });
    }

    downloadFile(path, native.url)
      .then((downloadedPath) => {
        if (downloadedPath) {
          if (callbacks?.onDownloadFinish) {
            callbacks.onDownloadFinish({
              path: downloadedPath,
              size: native.size,
            });
          }

          return resolve({
            path: downloadedPath,
          });
        }

        const e = new Error(`Could not download native ${path}`);

        if (callbacks?.onError) {
          callbacks.onError({ path, size: native.size }, e);
        }

        return reject(e);
      })
      .catch((e) => {
        if (callbacks?.onError) {
          callbacks.onError({ path, size: native.size }, e);
        }

        reject(e);
      });
  });
}

export async function downloadLibrary(
  { minecraftRoot, library }: DownloadLibraryParams,
  callbacks?: DownloadLibraryCallbacks
): Promise<DownloadLibraryResult> {
  const libraryPath = library.downloads.artifact.path.split('/');
  const dir = `${minecraftRoot}\\libraries\\${libraryPath
    .slice(0, -1)
    .join('\\')}`;
  const path = `${dir}\\${libraryPath.at(-1)}`;

  if (fs.existsSync(path)) {
    if (callbacks?.onFoundExisting) {
      callbacks.onFoundExisting({
        path,
        size: library.downloads.artifact.size,
      });
    }

    return { path };
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.openSync(path, 'w');

  return new Promise<DownloadLibraryResult>((resolve, reject) => {
    if (callbacks?.onDownloadStart) {
      callbacks.onDownloadStart({
        path,
        size: library.downloads.artifact.size,
      });
    }

    downloadFile(path, library.downloads.artifact.url)
      .then((downloadedPath) => {
        if (downloadedPath) {
          if (callbacks?.onDownloadFinish) {
            callbacks.onDownloadFinish({
              path: downloadedPath,
              size: library.downloads.artifact.size,
            });
          }

          return resolve({
            path: downloadedPath,
          });
        }

        const e = new Error(`Could not download library ${path}`);

        if (callbacks?.onError) {
          callbacks.onError({ path, size: library.downloads.artifact.size }, e);
        }

        return reject(e);
      })
      .catch((e) => {
        if (callbacks?.onError) {
          callbacks.onError({ path, size: library.downloads.artifact.size }, e);
        }

        reject(e);
      });
  });
}

const limiter = new Bottleneck({
  maxConcurrent: 200,
});

function scheduleDownloadNative(
  params: {
    minecraftRoot: string;
    native: MinecraftArtifact;
  },
  callbacks?: DownloadLibraryCallbacks
) {
  return limiter.schedule(() => downloadNative(params, callbacks));
}

function scheduleDownloadLibrary(
  params: DownloadLibraryParams,
  callbacks?: DownloadLibraryCallbacks
) {
  return limiter.schedule(() => downloadLibrary(params, callbacks));
}

export default async function downloadLibraries(
  { minecraftRoot, libraries, natives }: DownloadLibrariesParams,
  callbacks?: DownloadLibraryCallbacks
): Promise<DownloadLibrariesResult> {
  const librariesResult = await Promise.all<DownloadLibraryResult>(
    libraries.map((library) =>
      scheduleDownloadLibrary({ library, minecraftRoot }, callbacks)
    )
  );

  const nativesResult =
    natives &&
    (await Promise.all<DownloadLibraryResult>(
      natives.map((native) =>
        scheduleDownloadNative({ minecraftRoot, native }, callbacks)
      )
    ));

  return {
    libraries: librariesResult,
    natives: nativesResult,
  };
}
