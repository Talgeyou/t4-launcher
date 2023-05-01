import { selectAppDataPath } from 'renderer/entities/system';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';

export default function useMinecraftRoot() {
  const appData = useAppSelector(selectAppDataPath);

  return appData ? `${appData}\\.t4-launcher` : '';
}
