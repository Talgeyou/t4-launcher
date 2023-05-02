import fs from 'fs';
import {
  MinecraftVanillaVersionManifest,
  MinecraftVersionManifest,
} from 'renderer/entities/minecraft-version';
import path from 'path';
import { MinecraftAssetIndex } from '../types';
import downloadAssetIndex from './downloadAssetIndex';
import downloadAssets from './downloadAssets';
import downloadLibraries from './downloadLibraries';
import downloadVanillaJar from './downloadVanillaJar';
import downloadVersionManifest from './downloadVersionManifest';
import {
  DownloadAssetCallbacks,
  DownloadAssetIndexCallbacks,
  DownloadLibraryCallbacks,
  DownloadVanillaJarCallbacks,
  DownloadVersionManifestCallbacks,
} from './types';
import getValidLibraries from './getValidLibraries';
import getValidNatives from './getValidNatives';

export type DownloadVanillaParams = {
  minecraftRoot: string;
  versionId: string;
};

export type DownloadVanillaCallbacks = {
  manifest?: DownloadVersionManifestCallbacks;
  jar?: DownloadVanillaJarCallbacks;
  library?: DownloadLibraryCallbacks;
  assetIndex?: DownloadAssetIndexCallbacks;
  asset?: DownloadAssetCallbacks;
  onCalculatedDownloadSize?: (size: number) => void;
  onError?: (versionId: string, e: any) => void;
};

export type DownloadVanillaResult = {
  jarPath: string;
  libraryPaths: string[];
  assetsPath: string;
  assetIndexPath: string;
};

export default async function downloadVanilla(
  { minecraftRoot, versionId }: DownloadVanillaParams,
  callbacks?: DownloadVanillaCallbacks
): Promise<DownloadVanillaResult | null> {
  try {
    const result: DownloadVanillaResult = {
      jarPath: '',
      libraryPaths: [],
      assetIndexPath: '',
      assetsPath: '',
    };

    const manifestPath = (
      await downloadVersionManifest(
        { minecraftRoot, versionId },
        callbacks?.manifest
      )
    ).path;

    const manifestJson: MinecraftVanillaVersionManifest = JSON.parse(
      fs.readFileSync(manifestPath).toString()
    );

    result.assetIndexPath = (
      await downloadAssetIndex(
        {
          minecraftRoot,
          id: manifestJson.assetIndex.id,
          url: manifestJson.assetIndex.url,
        },
        callbacks?.assetIndex
      )
    ).path;

    const assetIndexJson: MinecraftAssetIndex = JSON.parse(
      fs.readFileSync(result.assetIndexPath).toString()
    );

    let downloadSize = 0;
    downloadSize += manifestJson.downloads.client.size;

    const validLibraries = getValidLibraries(manifestJson.libraries);

    const validNatives = getValidNatives(validLibraries);

    validLibraries.forEach((library) => {
      downloadSize += library.downloads.artifact.size;
    });

    validNatives.forEach((native) => {
      downloadSize += native.size;
    });

    Object.values(assetIndexJson).forEach((group) => {
      Object.values(group).forEach((asset) => {
        downloadSize += asset.size;
      });
    });

    if (callbacks?.onCalculatedDownloadSize) {
      callbacks.onCalculatedDownloadSize(downloadSize);
    }

    const vanillaJarResult = await downloadVanillaJar(
      {
        minecraftRoot,
        versionId,
        url: manifestJson.downloads.client.url,
        size: manifestJson.downloads.client.size,
      },
      callbacks?.jar
    );

    const librariesResult = await downloadLibraries(
      {
        minecraftRoot,
        libraries: validLibraries,
        natives: validNatives,
      },
      callbacks?.library
    );

    const assetsResult = await downloadAssets(
      {
        minecraftRoot,
        assetIndex: assetIndexJson,
      },
      callbacks?.asset
    );

    result.jarPath = vanillaJarResult.path;
    result.libraryPaths = [
      ...librariesResult.libraries.map((library) => library.path),
      ...(librariesResult.natives?.map((native) => native.path) ?? []),
    ];

    result.assetsPath = assetsResult.assetsRoot;

    return result;
  } catch (e) {
    const errorLogDir = path.resolve(minecraftRoot);
    const errorLogPath = path.resolve(
      `${errorLogDir}\\t4-launcher_error_log.txt`
    );

    if (!fs.existsSync(errorLogDir)) {
      fs.mkdirSync(errorLogDir, { recursive: true });
    }

    fs.writeFileSync(errorLogPath, (e as Error).message);

    if (callbacks?.onError) {
      callbacks.onError(versionId, e);
    }

    return null;
  }
}
