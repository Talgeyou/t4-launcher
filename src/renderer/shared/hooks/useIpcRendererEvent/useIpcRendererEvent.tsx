import { useEffect } from 'react';
import { IpcRendererHookParams } from './types';

export default function useIpcRendererEvent<T extends IpcRendererHookParams>(
  params: T
) {
  useEffect(() => {
    function handler(data: any, error: any) {
      params.handler(data, error);
    }

    const electron = window?.electron;

    const { ipcRenderer } = electron;

    const unsubcribe = ipcRenderer.on(params.key, handler);

    return () => {
      unsubcribe();
    };
  }, [params]);
}
