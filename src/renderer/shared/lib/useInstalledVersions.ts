import { useEffect, useState } from 'react';
import { MinecraftInstalledVersion } from 'renderer/entities/minecraft-version';
import useMinecraftRoot from './useMinecraftRoot';

export default function useInstalledVersions() {
  const [versions, setVersions] = useState<MinecraftInstalledVersion[]>([]);
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const minecraftRoot = useMinecraftRoot();

  useEffect(() => {
    if (
      minecraftRoot &&
      typeof window?.electrolAPI?.getInstalledVersions !== 'undefined' &&
      state === 'idle'
    ) {
      setState('loading');
      window.electrolAPI
        .getInstalledVersions(minecraftRoot)
        .then((newVersions) => {
          setVersions(newVersions);
          setState('success');
          return newVersions;
        })
        .catch((e) => {
          setState('error');
          // eslint-disable-next-line no-console
          console.log(e);
        });
    }
  }, [minecraftRoot, state]);

  return { state, versions };
}
