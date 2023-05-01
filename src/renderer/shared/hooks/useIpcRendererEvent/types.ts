import {
  DownloadAssetIndexLog,
  DownloadAssetLog,
  DownloadLibraryLog,
  DownloadVanillaJarLog,
  DownloadVersionManifestLog,
} from 'main/core/minecraft-launcher/download/types';
import {
  MinecraftDownloadAssetEventName,
  MinecraftDownloadAssetIndexEventName,
  MinecraftDownloadLibraryEventName,
  MinecraftDownloadManifestEventName,
  MinecraftDownloadSizeEventName,
  MinecraftDownloadVanillaJarEventName,
  MinecraftLaunchEventName,
} from 'main/types';

type LaunchStartEvent = {
  key: MinecraftLaunchEventName.Start;
  handler: (data: { versionId: string }) => void;
};

type LaunchFinishEvent = {
  key: MinecraftLaunchEventName.Finish;
  handler: (data: { versionId: string }) => void;
};

type LaunchErrorEvent = {
  key: MinecraftLaunchEventName.Error;
  handler: (data: { versionId: string }, error: string) => void;
};

type DownloadManifestFoundExistingEvent = {
  key: MinecraftDownloadManifestEventName.FoundExisting;
  handler: (data: DownloadVersionManifestLog) => void;
};
type DownloadManifestStartEvent = {
  key: MinecraftDownloadManifestEventName.Start;
  handler: (data: DownloadVersionManifestLog) => void;
};
type DownloadManifestFinishEvent = {
  key: MinecraftDownloadManifestEventName.Finish;
  handler: (data: DownloadVersionManifestLog) => void;
};
type DownloadManifestErrorEvent = {
  key: MinecraftDownloadManifestEventName.Error;
  handler: (data: DownloadVersionManifestLog, error: string) => void;
};

type DownloadVanillaJarFoundExistingEvent = {
  key: MinecraftDownloadVanillaJarEventName.FoundExisting;
  handler: (data: DownloadVanillaJarLog) => void;
};
type DownloadVanillaJarStartEvent = {
  key: MinecraftDownloadVanillaJarEventName.Start;
  handler: (data: DownloadVanillaJarLog) => void;
};
type DownloadVanillaJarFinishEvent = {
  key: MinecraftDownloadVanillaJarEventName.Finish;
  handler: (data: DownloadVanillaJarLog) => void;
};
type DownloadVanillaJarErrorEvent = {
  key: MinecraftDownloadVanillaJarEventName.Error;
  handler: (data: DownloadVanillaJarLog, error: string) => void;
};

type DownloadLibraryFoundExistingEvent = {
  key: MinecraftDownloadLibraryEventName.FoundExisting;
  handler: (data: DownloadLibraryLog) => void;
};
type DownloadLibraryStartEvent = {
  key: MinecraftDownloadLibraryEventName.Start;
  handler: (data: DownloadLibraryLog) => void;
};
type DownloadLibraryFinishEvent = {
  key: MinecraftDownloadLibraryEventName.Finish;
  handler: (data: DownloadLibraryLog) => void;
};
type DownloadLibraryErrorEvent = {
  key: MinecraftDownloadLibraryEventName.Error;
  handler: (data: DownloadLibraryLog, error: string) => void;
};

type DownloadAssetIndexFoundExistingEvent = {
  key: MinecraftDownloadAssetIndexEventName.FoundExisting;
  handler: (data: DownloadAssetIndexLog) => void;
};
type DownloadAssetIndexStartEvent = {
  key: MinecraftDownloadAssetIndexEventName.Start;
  handler: (data: DownloadAssetIndexLog) => void;
};
type DownloadAssetIndexFinishEvent = {
  key: MinecraftDownloadAssetIndexEventName.Finish;
  handler: (data: DownloadAssetIndexLog) => void;
};
type DownloadAssetIndexErrorEvent = {
  key: MinecraftDownloadAssetIndexEventName.Error;
  handler: (data: DownloadAssetIndexLog, error: string) => void;
};

type DownloadAssetFoundExistingEvent = {
  key: MinecraftDownloadAssetEventName.FoundExisting;
  handler: (data: DownloadAssetLog) => void;
};
type DownloadAssetStartEvent = {
  key: MinecraftDownloadAssetEventName.Start;
  handler: (data: DownloadAssetLog) => void;
};
type DownloadAssetFinishEvent = {
  key: MinecraftDownloadAssetEventName.Finish;
  handler: (data: DownloadAssetLog) => void;
};
type DownloadAssetErrorEvent = {
  key: MinecraftDownloadAssetEventName.Error;
  handler: (data: DownloadAssetLog, error: string) => void;
};

type DownloadSizeCalculateEvent = {
  key: MinecraftDownloadSizeEventName.Calculate;
  handler: (data: { size: number }) => void;
};

export type IpcRendererHookParams =
  | LaunchStartEvent
  | LaunchFinishEvent
  | LaunchErrorEvent
  | DownloadManifestFoundExistingEvent
  | DownloadManifestStartEvent
  | DownloadManifestFinishEvent
  | DownloadManifestErrorEvent
  | DownloadVanillaJarFoundExistingEvent
  | DownloadVanillaJarStartEvent
  | DownloadVanillaJarFinishEvent
  | DownloadVanillaJarErrorEvent
  | DownloadLibraryFoundExistingEvent
  | DownloadLibraryStartEvent
  | DownloadLibraryFinishEvent
  | DownloadLibraryErrorEvent
  | DownloadAssetIndexFoundExistingEvent
  | DownloadAssetIndexStartEvent
  | DownloadAssetIndexFinishEvent
  | DownloadAssetIndexErrorEvent
  | DownloadAssetFoundExistingEvent
  | DownloadAssetStartEvent
  | DownloadAssetFinishEvent
  | DownloadAssetErrorEvent
  | DownloadSizeCalculateEvent;
