import childProcess from 'child_process';
import fs from 'fs';
import { MinecraftVersionManifest } from 'renderer/entities/minecraft-version';
import path from 'path';
import { downloadVanilla } from './download';
import { DownloadVanillaCallbacks } from './download/downloadVanilla';
import getLaunchString from './getLaunchString';
import { MinecraftLaunchParams } from './types';

function isString(item: string | null | undefined): item is string {
  return typeof item === 'string';
}

function copyJar(nativesPath: string, jarPath: string) {
  const copiedJarPath = `${nativesPath}\\minecraft.jar`;

  fs.copyFileSync(jarPath, copiedJarPath);

  return copiedJarPath;
}

type MinecraftLaunchCallbacks = {
  download?: DownloadVanillaCallbacks;
  onLaunchStart?: (versionId: string) => void;
  onLaunchFinish?: (versionId: string) => void;
  onLaunchError?: (versionId: string, error: Error) => void;
};

export default async function launchMinecraft(
  { root, versionId, username }: MinecraftLaunchParams,
  callbacks?: MinecraftLaunchCallbacks
) {
  const downloadVanillaResult = await downloadVanilla(
    { minecraftRoot: root, versionId },
    callbacks?.download
  );

  if (!downloadVanillaResult) {
    if (callbacks?.onLaunchError) {
      callbacks.onLaunchError(
        versionId,
        new Error('Could not download vanilla')
      );
    }

    return null;
  }

  const { jarPath, libraryPaths, manifestPath } = downloadVanillaResult;

  const manifestJson: MinecraftVersionManifest = JSON.parse(
    fs.readFileSync(manifestPath).toString()
  );

  const nativesPath = `${root}\\bin`;

  if (!fs.existsSync(nativesPath)) {
    fs.mkdirSync(nativesPath, { recursive: true });
  }

  const copiedLibraryPaths = libraryPaths
    .map((library): string | undefined => {
      if (library) {
        const copiedLibraryPath = `${nativesPath}\\${library
          .split('\\')
          .at(-1)}`;

        fs.copyFileSync(library, copiedLibraryPath);

        return copiedLibraryPath;
      }

      return undefined;
    })
    .filter(isString);

  const copiedJarPath = copyJar(nativesPath, jarPath);

  copiedLibraryPaths.push(copiedJarPath);

  const launchString = getLaunchString({
    mainClass: manifestJson.mainClass,
    minecraftRoot: root,
    username,
    versionId,
    jarPath,
    libraryPaths: libraryPaths.filter(isString),
    nativesPath,
    assetsIndex: manifestJson.assets,
  });

  fs.writeFileSync(path.resolve(`${root}\\start_minecraft.bat`), launchString);

  if (callbacks?.onLaunchStart) {
    callbacks.onLaunchStart(versionId);
  }

  const gameInstance = childProcess.exec(launchString);

  gameInstance.on('close', () => {
    setTimeout(() => {
      fs.rmSync(nativesPath, { recursive: true });
    }, 1000);
  });

  gameInstance.on('error', (e) => {
    if (callbacks?.onLaunchError && e) {
      callbacks.onLaunchError(versionId, e);
    }
  });

  return new Promise((resolve) => {
    gameInstance.on('spawn', () => {
      if (callbacks?.onLaunchFinish) {
        callbacks.onLaunchFinish(versionId);
      }

      resolve(true);
    });
  });
}
