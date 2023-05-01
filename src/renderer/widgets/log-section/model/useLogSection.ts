import {
  MinecraftDownloadAssetEventName,
  MinecraftDownloadAssetIndexEventName,
  MinecraftDownloadLibraryEventName,
  MinecraftDownloadManifestEventName,
  MinecraftDownloadVanillaJarEventName,
  MinecraftLaunchEventName,
} from 'main/types';
import { useState } from 'react';
import useIpcRendererEvent from 'renderer/shared/hooks/useIpcRendererEvent/useIpcRendererEvent';

export default function useLogSection() {
  const [messages, setMessages] = useState<{ id: number; body: string }[]>([]);

  useIpcRendererEvent({
    key: MinecraftLaunchEventName.Start,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Starting minecraft ${data.versionId} version`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadManifestEventName.Start,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Downloading manifest of ${data.versionId} version`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadManifestEventName.Finish,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Manifest of ${data.versionId} version has been downloaded`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadManifestEventName.FoundExisting,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Using existing manifest of ${data.versionId} version`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadVanillaJarEventName.Start,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Downloading vanilla jar of ${data.versionId} version`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadVanillaJarEventName.Finish,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Vanilla jar of ${data.versionId} version has been downloaded`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadVanillaJarEventName.FoundExisting,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Using existing vanilla jar of ${data.versionId} version`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadLibraryEventName.Start,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Downloading library ${data.path}: ${data.size}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadLibraryEventName.Finish,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Library ${data.path} has been downloaded: ${data.size}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadLibraryEventName.FoundExisting,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Using existing library ${data.path}: ${data.size}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetIndexEventName.Start,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Downloading assetIndex ${data.assetIndexId}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetIndexEventName.Finish,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] assetIndex ${data.assetIndexId} has been downloaded`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetIndexEventName.FoundExisting,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Using existing assetIndex ${data.assetIndexId}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetEventName.Start,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Downloading asset ${data.hash}: ${data.size}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetEventName.Finish,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Asset ${data.hash} has been downloaded: ${data.size}`,
        },
      ]);
    },
  });

  useIpcRendererEvent({
    key: MinecraftDownloadAssetEventName.FoundExisting,
    handler: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          body: `[T4 Launcher] Using existing asset ${data.hash}: ${data.size}`,
        },
      ]);
    },
  });

  return {
    messages,
  };
}
