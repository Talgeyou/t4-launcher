import { AppEventName } from 'main/types';
import { useCallback } from 'react';

export default function useSendIpcRendererEvent(eventName: AppEventName) {
  const send = useCallback(() => {
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.sendMessage(eventName);
    }
  }, [eventName]);

  return { send };
}
