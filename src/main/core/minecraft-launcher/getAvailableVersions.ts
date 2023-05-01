import axios from 'axios';
import { MinecraftManifestVersion } from 'renderer/entities/minecraft-version';

const MANIFEST_URL =
  'https://launchermeta.mojang.com/mc/game/version_manifest_v2.json';

export default async function getAvailableVersions(): Promise<
  MinecraftManifestVersion[]
> {
  return axios
    .get(MANIFEST_URL)
    .then((res) =>
      res.data.versions.filter(
        (version: MinecraftManifestVersion) => version.type === 'release'
      )
    );
}
