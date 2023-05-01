/* eslint-disable no-unused-vars */
import { ElectronApi, ElectronHandler } from 'main/preload';

declare global {
  interface Window {
    electron: ElectronHandler;
    electrolAPI: ElectronApi;
  }
}

export {};
