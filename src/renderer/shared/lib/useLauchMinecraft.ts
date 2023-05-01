import { MinecraftLaunchParams } from 'main/core/minecraft-launcher';
import { useCallback, useState } from 'react';
import useMinecraftRoot from './useMinecraftRoot';

export default function useLaunchMinecraft() {
  const minecraftRoot = useMinecraftRoot();
  const [isLoading, setIsLoading] = useState(false);

  const launch = useCallback(
    (params: Omit<MinecraftLaunchParams, 'root'>) => {
      if (!minecraftRoot || isLoading) {
        return;
      }

      setIsLoading(true);
      if (typeof window?.electrolAPI?.launchMinecraft !== 'undefined') {
        window.electrolAPI
          .launchMinecraft({
            ...params,
            root: minecraftRoot,
          })
          .finally(() => setIsLoading(false))
          // eslint-disable-next-line no-console
          .catch((e) => console.log(e));
      }
    },
    [isLoading, minecraftRoot]
  );

  return { isLoading, launch };
}
