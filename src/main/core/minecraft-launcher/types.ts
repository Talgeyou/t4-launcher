export type MinecraftLaunchParams = {
  root: string;
  versionId: string;
  username: string;
};

const minecraftOperationSystems = ['osx', 'windows'] as const;

export type MinecraftOS = (typeof minecraftOperationSystems)[number];

export type MinecraftDownloadRule = {
  action: 'allow';
  os?: { name: MinecraftOS };
};

export type MinecraftLibrary = {
  downloads: {
    artifact: {
      path: string;
      sha1: string;
      size: number;
      url: string;
    };
  };
  name: string;
  rules?: MinecraftDownloadRule[];
};

export type MinecraftAssetIndexAsset = {
  hash: string;
  size: number;
};

export type MinecraftAssetIndex = Record<
  string,
  Record<string, MinecraftAssetIndexAsset>
>;
