import {
  MinecraftDownloadAssetEventName,
  MinecraftDownloadLibraryEventName,
  MinecraftDownloadSizeEventName,
  MinecraftDownloadVanillaJarEventName,
  MinecraftLaunchEventName,
} from 'main/types';
import { useState } from 'react';
import useIpcRendererEvent from 'renderer/shared/hooks/useIpcRendererEvent';

export default function useDownloadProgress() {
  const [totalSize, setTotalSize] = useState(0);
  const [downloadedSize, setDownloadedSize] = useState(0);

  useIpcRendererEvent({
    key: MinecraftDownloadVanillaJarEventName.Finish,
    handler: (data) => {
      setDownloadedSize((prev) => prev + data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadVanillaJarEventName.FoundExisting,
    handler: (data) => {
      setDownloadedSize((prev) => prev + data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadLibraryEventName.Finish,
    handler: (data) => {
      setDownloadedSize((prev) => prev + data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadLibraryEventName.FoundExisting,
    handler: (data) => {
      setDownloadedSize((prev) => prev + data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetEventName.Finish,
    handler: (data) => {
      setDownloadedSize((prev) => prev + data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetEventName.FoundExisting,
    handler: (data) => {
      setDownloadedSize((prev) => prev + data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadSizeEventName.Calculate,
    handler: (data) => {
      setTotalSize(data.size);
    },
  });

  useIpcRendererEvent({
    key: MinecraftLaunchEventName.Start,
    handler: (data) => {
      setDownloadedSize(0);
      setTotalSize(0);
    },
  });

  useIpcRendererEvent({
    key: MinecraftLaunchEventName.Finish,
    handler: (data) => {
      setDownloadedSize(0);
      setTotalSize(0);
    },
  });

  return { totalSize, downloadedSize };
}
