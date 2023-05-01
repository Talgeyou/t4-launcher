import axios from 'axios';
import fs from 'fs';
import { MinecraftManifestVersion } from 'renderer/entities/minecraft-version';
import getAvailableVersions from '../getAvailableVersions';
import {
  DownloadVersionManifestCallbacks,
  DownloadVersionManifestParams,
  DownloadVersionManifestResult,
} from './types';

export default async function downloadVersionManifest(
  { minecraftRoot, versionId }: DownloadVersionManifestParams,
  callbacks?: DownloadVersionManifestCallbacks
): Promise<DownloadVersionManifestResult> {
  const dir = `${minecraftRoot}\\versions\\${versionId}`;
  const path = `${minecraftRoot}\\versions\\${versionId}\\${versionId}.json`;

  if (fs.existsSync(path)) {
    if (callbacks?.onFoundExisting) {
      callbacks?.onFoundExisting({ versionId, path });
    }

    return { path };
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const manifestVersion = await getAvailableVersions().then((versions) =>
    versions.find((version) => version.id === versionId)
  );

  if (!manifestVersion) {
    const e = new Error('Wrong versionId was provided');

    if (callbacks?.onError) {
      callbacks.onError({ path, versionId }, e);
    }

    throw e;
  }

  if (callbacks?.onDownloadStart) {
    callbacks.onDownloadStart({ versionId, path });
  }

  const downloadedVersionManifest = await axios
    .get<MinecraftManifestVersion>(manifestVersion.url)
    .then((res) => res.data);

  fs.writeFileSync(path, JSON.stringify(downloadedVersionManifest));

  if (callbacks?.onDownloadFinish) {
    callbacks.onDownloadFinish({ versionId, path });
  }

  return { path };
}
