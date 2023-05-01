import {
  MinecraftDownloadAssetEventName,
  MinecraftDownloadAssetIndexEventName,
  MinecraftDownloadLibraryEventName,
  MinecraftDownloadManifestEventName,
  MinecraftDownloadVanillaJarEventName,
  MinecraftLaunchEventName,
} from 'main/types';
import { useCallback, useState } from 'react';
import useIpcRendererEvent from 'renderer/shared/hooks/useIpcRendererEvent';
import { v4 } from 'uuid';

export default function useErrorPopup() {
  const [errors, setErrors] = useState<{ id: string; error: string }[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpened(false);
    setErrors([]);
  }, []);

  useIpcRendererEvent({
    key: MinecraftLaunchEventName.Error,
    handler: (data, error) => {
      setErrors((prev) => [{ id: v4(), error }, ...prev]);
      setIsOpened(true);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadManifestEventName.Error,
    handler: (data, error) => {
      setErrors((prev) => [{ id: v4(), error }, ...prev]);
      setIsOpened(true);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadVanillaJarEventName.Error,
    handler: (data, error) => {
      setErrors((prev) => [{ id: v4(), error }, ...prev]);
      setIsOpened(true);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadLibraryEventName.Error,
    handler: (data, error) => {
      setErrors((prev) => [{ id: v4(), error }, ...prev]);
      setIsOpened(true);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetIndexEventName.Error,
    handler: (data, error) => {
      setErrors((prev) => [{ id: v4(), error }, ...prev]);
      setIsOpened(true);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetEventName.Error,
    handler: (data, error) => {
      setErrors((prev) => [{ id: v4(), error }, ...prev]);
      setIsOpened(true);
    },
  });

  return { errors, isOpened, close: handleClose };
}
