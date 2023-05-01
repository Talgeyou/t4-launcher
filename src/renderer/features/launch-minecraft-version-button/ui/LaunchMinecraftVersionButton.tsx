import { useCallback } from 'react';
import useLaunchMinecraft from 'renderer/shared/lib/useLauchMinecraft';
import Button from 'renderer/shared/ui/button';

type Props = { versionId?: string; username?: string };

function LaunchMinecraftVersionButton({ versionId, username }: Props) {
  const { isLoading, launch } = useLaunchMinecraft();

  const handleLaunch = useCallback(() => {
    if (isLoading) {
      return;
    }

    if (!versionId || !username) {
      return;
    }

    launch({
      username,
      versionId,
    });
  }, [isLoading, launch, username, versionId]);

  return (
    <Button disabled={isLoading} onClick={handleLaunch}>
      Launch
    </Button>
  );
}

export default LaunchMinecraftVersionButton;
