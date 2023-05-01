export enum MinecraftLaunchEventName {
  Start = 'launch:start',
  Finish = 'launch:finish',
  Error = 'launch:error',
}

export enum MinecraftDownloadManifestEventName {
  Start = 'download:manifest:start',
  Finish = 'download:manifest:finish',
  FoundExisting = 'download:manifest:found_existing',
  Error = 'download:manifest:error',
}

export enum MinecraftDownloadVanillaJarEventName {
  Start = 'download:jar:vanilla:start',
  Finish = 'download:jar:vanilla:finish',
  FoundExisting = 'download:jar:vanilla:found_existing',
  Error = 'download:jar:vanilla:error',
}

export enum MinecraftDownloadLibraryEventName {
  Start = 'download:library:start',
  Finish = 'download:library:finish',
  FoundExisting = 'download:library:found_existing',
  Error = 'download:library:error',
}

export enum MinecraftDownloadAssetIndexEventName {
  Start = 'download:asset_index:start',
  Finish = 'download:asset_index:finish',
  FoundExisting = 'download:asset_index:found_existing',
  Error = 'download:asset_index:error',
}

export enum MinecraftDownloadAssetEventName {
  Start = 'download:asset:start',
  Finish = 'download:asset:finish',
  FoundExisting = 'download:asset:found_existing',
  Error = 'download:asset:error',
}

export enum MinecraftDownloadSizeEventName {
  Calculate = 'download:download_size:calculate',
}

export enum AppEventName {
  Minimize = 'app:minimize',
  Maximize = 'app:maximize',
  Close = 'app:close',
}
