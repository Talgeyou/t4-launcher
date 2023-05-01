import { AppEventName } from 'main/types';
import { memo } from 'react';
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeClose,
} from 'react-icons/vsc';
import { selectAccountUsername } from 'renderer/entities/account';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';
import useSendIpcRendererEvent from 'renderer/shared/hooks/useSendIpcRendererEvent';

function Header() {
  const username = useAppSelector(selectAccountUsername);

  const { send: minimize } = useSendIpcRendererEvent(AppEventName.Minimize);
  const { send: maximize } = useSendIpcRendererEvent(AppEventName.Maximize);
  const { send: close } = useSendIpcRendererEvent(AppEventName.Close);

  return (
    <header
      className="bg-slate-700/90 text-slate-50 flex justify-between items-center p-2 drop-shadow-2xl z-10 [-webkit-app-region:drag]"
      onDoubleClick={maximize}
    >
      <div className="flex items-center gap-2">
        <h1 className="text-lg px-2">
          T<span className="text-purple-400">4</span> Launcher
        </h1>
        <h2 className="text-sm">Username: {username}</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="[-webkit-app-region:no-drag] flex justify-center items-center rounded-md p-2 hover:bg-slate-50 hover:text-purple-500 transition-colors outline-none focus:ring-2 focus:ring-blue-500"
          onClick={minimize}
        >
          <VscChromeMinimize size={20} />
        </button>
        <button
          className="[-webkit-app-region:no-drag] flex justify-center items-center rounded-md p-2 hover:bg-slate-50 hover:text-purple-500 transition-colors outline-none focus:ring-2 focus:ring-blue-500"
          onClick={maximize}
        >
          <VscChromeMaximize size={20} />
        </button>
        <button
          className="[-webkit-app-region:no-drag] flex justify-center items-center rounded-md p-2 hover:bg-slate-50 hover:text-purple-500 transition-colors outline-none focus:ring-2 focus:ring-blue-500"
          onClick={close}
        >
          <VscChromeClose size={20} />
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
