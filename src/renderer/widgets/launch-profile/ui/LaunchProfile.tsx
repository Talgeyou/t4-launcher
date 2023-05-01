import { memo } from 'react';
import { selectAccountUsername } from 'renderer/entities/account';
import { selectSelectedProfile } from 'renderer/entities/profile';
import LaunchMinecraftVersionButton from 'renderer/features/launch-minecraft-version-button/ui/LaunchMinecraftVersionButton';
import ProfileSelector from 'renderer/features/profile-selector';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';

function LaunchProfile() {
  const selectedProfile = useAppSelector(selectSelectedProfile);
  const username = useAppSelector(selectAccountUsername);

  return (
    <div className="w-full p-4 flex gap-2">
      <ProfileSelector />
      <LaunchMinecraftVersionButton
        username={username}
        versionId={selectedProfile?.profile.lastVersionId}
      />
    </div>
  );
}

export default memo(LaunchProfile);
