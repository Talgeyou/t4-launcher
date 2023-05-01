import {
  MinecraftArtifact,
  MinecraftVersionManifestLibrary,
} from 'renderer/entities/minecraft-version';
import { MinecraftAssetIndex } from '../types';

// assetIndex
export type DownloadAssetIndexParams = {
  minecraftRoot: string;
  id: string;
  url: string;
};

export type DownloadAssetIndexLog = {
  path: string;
  assetIndexId: string;
};

export type DownloadAssetIndexCallbacks = {
  onDownloadStart?: (assetIndex: DownloadAssetIndexLog) => void;
  onDownloadFinish?: (assetIndex: DownloadAssetIndexLog) => void;
  onFoundExisting?: (assetIndex: DownloadAssetIndexLog) => void;
  onError?: (assetIndex: DownloadAssetIndexLog, error: Error) => void;
};

export type DownloadAssetIndexResult = {
  path: string;
};

// assets
export type DownloadAssetParams = {
  assetsRoot: string;
  asset: {
    dirName: string;
    name: string;
    hash: string;
    size: number;
  };
};

export type DownloadAssetLog = {
  name: string;
  hash: string;
  size: number;
  path: string;
};

export type DownloadAssetCallbacks = {
  onDownloadStart?: (asset: DownloadAssetLog) => void;
  onDownloadFinish?: (asset: DownloadAssetLog) => void;
  onFoundExisting?: (asset: DownloadAssetLog) => void;
  onError?: (asset: DownloadAssetLog, error: Error) => void;
};

export type DownloadAssetResult = {
  path: string;
};

export type DownloadAssetsParams = {
  minecraftRoot: string;
  assetIndex: MinecraftAssetIndex;
};

export type DownloadAssetsResult = {
  assetsRoot: string;
};

// libraries
export type DownloadLibraryParams = {
  minecraftRoot: string;
  library: MinecraftVersionManifestLibrary;
};

export type DownloadLibraryLog = {
  path: string;
  size: number;
};

export type DownloadLibraryCallbacks = {
  onDownloadStart?: (library: DownloadLibraryLog) => void;
  onDownloadFinish?: (library: DownloadLibraryLog) => void;
  onFoundExisting?: (library: DownloadLibraryLog) => void;
  onError?: (library: DownloadLibraryLog, error: Error) => void;
};

export type DownloadLibraryResult = {
  path: string;
};

export type DownloadLibrariesParams = {
  minecraftRoot: string;
  libraries: MinecraftVersionManifestLibrary[];
  natives?: MinecraftArtifact[];
};

export type DownloadLibrariesResult = {
  libraries: {
    path: string;
  }[];
  natives?: {
    path: string;
  }[];
};

// manifest
export type DownloadVersionManifestLog = {
  path: string;
  versionId: string;
};

export type DownloadVersionManifestCallbacks = {
  onDownloadStart?: (manifest: DownloadVersionManifestLog) => void;
  onDownloadFinish?: (manifest: DownloadVersionManifestLog) => void;
  onFoundExisting?: (manifest: DownloadVersionManifestLog) => void;
  onError?: (manifest: DownloadVersionManifestLog, error: Error) => void;
};

export type DownloadVersionManifestParams = {
  minecraftRoot: string;
  versionId: string;
};

export type DownloadVersionManifestResult = {
  path: string;
};

// vanilla jar
export type DownloadVanillaJarParams = {
  minecraftRoot: string;
  versionId: string;
  size: number;
  url: string;
};

export type DownloadVanillaJarLog = {
  versionId: string;
  size: number;
  path: string;
};

export type DownloadVanillaJarCallbacks = {
  onDownloadStart?: (jar: DownloadVanillaJarLog) => void;
  onDownloadFinish?: (jar: DownloadVanillaJarLog) => void;
  onFoundExisting?: (jar: DownloadVanillaJarLog) => void;
  onError?: (jar: DownloadVanillaJarLog, error: Error) => void;
};

export type DownloadVanillaJarResult = {
  path: string;
};
