import { memo } from 'react';
import { MinecraftInstalledVersion } from 'renderer/entities/minecraft-version';
import LaunchMinecraftVersionButton from 'renderer/features/launch-minecraft-version-button/ui/LaunchMinecraftVersionButton';

type Props = { version: MinecraftInstalledVersion; username: string };

function VersionCard({ version, username }: Props) {
  return (
    <div>
      <h1 className="text-lg">{version.meta.id}</h1>
      {version.isForge && <h2 className="text-sm">FORGE</h2>}
      <LaunchMinecraftVersionButton
        versionId={version.meta.id}
        username={username}
      />
    </div>
  );
}

export default memo(VersionCard);
