export type MinecraftInstalledVersion = {
  jarPath: string;
  meta: Record<string, any>;
  isForge: boolean;
};

export type MinecraftVersionType =
  | 'snapshot'
  | 'release'
  | 'old_alpha'
  | 'old_beta';

export type MinecraftManifestVersion = {
  id: string;
  type: MinecraftVersionType;
  url: string;
};

export type MinecraftVersionManifestLibraryRuleOsName =
  | 'osx'
  | 'linux'
  | 'windows';

export type MinecraftVersionManifestLibraryRuleOs = {
  name?: MinecraftVersionManifestLibraryRuleOsName;
};

export type MinecraftVersionManifestLibraryRule = {
  action: 'allow' | 'disallow';
  os?: MinecraftVersionManifestLibraryRuleOs;
};

export type MinecraftArtifact = {
  path: string;
  sha1: string;
  size: number;
  url: string;
};

export type MinecraftVersionManifestLibrary = {
  downloads: {
    artifact: MinecraftArtifact;
    classifiers?: {
      'natives-linux': MinecraftArtifact;
      'natives-windows': MinecraftArtifact;
    };
  };
  name: string;
  natives?: { linux?: string; windows?: string; osx?: string };
  rules?: MinecraftVersionManifestLibraryRule[];
};

export type MinecraftCommonVersionManifest = {
  id: string;
  type: string;
  libraries: MinecraftVersionManifestLibrary[];
  mainClass: string;
  arguments: {
    game: string[];
    jvm: string[];
  };
};

export type MinecraftVanillaVersionManifest = MinecraftCommonVersionManifest & {
  assetIndex: {
    id: string;
    sha1: string;
    size: number;
    totalSize: string;
    url: string;
  };
  assets: string;
  downloads: {
    client: {
      sha1: string;
      size: number;
      url: string;
    };
  };
};

export type MinecraftForgeVersionManifest = MinecraftCommonVersionManifest & {
  inheritsFrom: string;
};

export type MinecraftVersionManifest =
  | MinecraftVanillaVersionManifest
  | MinecraftForgeVersionManifest;
