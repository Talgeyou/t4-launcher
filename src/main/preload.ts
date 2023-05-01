// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { MinecraftLaunchParams } from 'main/core/minecraft-launcher';
import { app, contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Profile } from 'renderer/entities/profile';
import { Account } from 'renderer/entities/account';
import {
  AppEventName,
  MinecraftDownloadAssetEventName,
  MinecraftDownloadAssetIndexEventName,
  MinecraftDownloadLibraryEventName,
  MinecraftDownloadManifestEventName,
  MinecraftDownloadSizeEventName,
  MinecraftDownloadVanillaJarEventName,
  MinecraftLaunchEventName,
} from './types';

export type Channels =
  | 'system-paths'
  | MinecraftLaunchEventName.Start
  | MinecraftLaunchEventName.Finish
  | MinecraftLaunchEventName.Error
  | MinecraftDownloadManifestEventName.FoundExisting
  | MinecraftDownloadManifestEventName.Start
  | MinecraftDownloadManifestEventName.Finish
  | MinecraftDownloadManifestEventName.Error
  | MinecraftDownloadVanillaJarEventName.FoundExisting
  | MinecraftDownloadVanillaJarEventName.Start
  | MinecraftDownloadVanillaJarEventName.Finish
  | MinecraftDownloadVanillaJarEventName.Error
  | MinecraftDownloadLibraryEventName.FoundExisting
  | MinecraftDownloadLibraryEventName.Start
  | MinecraftDownloadLibraryEventName.Finish
  | MinecraftDownloadLibraryEventName.Error
  | MinecraftDownloadAssetIndexEventName.FoundExisting
  | MinecraftDownloadAssetIndexEventName.Start
  | MinecraftDownloadAssetIndexEventName.Finish
  | MinecraftDownloadAssetIndexEventName.Error
  | MinecraftDownloadAssetEventName.FoundExisting
  | MinecraftDownloadAssetEventName.Start
  | MinecraftDownloadAssetEventName.Finish
  | MinecraftDownloadAssetEventName.Error
  | MinecraftDownloadSizeEventName.Calculate
  | AppEventName.Minimize
  | AppEventName.Maximize
  | AppEventName.Close;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args?: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const electronAPI = {
  getSystemPaths: () => ipcRenderer.invoke('getSystemPaths'),
  launchMinecraft: (params: MinecraftLaunchParams) =>
    ipcRenderer.invoke('launchMinecraft', params),
  getInstalledVersions: (minecraftRoot: string) =>
    ipcRenderer.invoke('getInstalledVersions', minecraftRoot),
  getAvailableVersions: () => ipcRenderer.invoke('getAvailableVersions'),
  getProfiles: (minecraftRoot: string) =>
    ipcRenderer.invoke('getProfiles', minecraftRoot),
  getAccount: (minecraftRoot: string) =>
    ipcRenderer.invoke('getAccount', minecraftRoot),
  updateProfiles: (minecraftRoot: string, profiles: Record<string, Profile>) =>
    ipcRenderer.invoke('updateProfiles', minecraftRoot, profiles),
  updateAccount: (minecraftRoot: string, account: Account) =>
    ipcRenderer.invoke('updateAccount', minecraftRoot, account),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('electrolAPI', electronAPI);

export type ElectronHandler = typeof electronHandler;
export type ElectronApi = typeof electronAPI;
