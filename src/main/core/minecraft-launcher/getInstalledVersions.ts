import fs from 'fs';
import { MinecraftInstalledVersion } from 'renderer/entities/minecraft-version';

export default function getInstalledVersions(minecraftRoot: string) {
  const baseDir = `${minecraftRoot}\\versions`;

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const versions: MinecraftInstalledVersion[] = [];

  try {
    fs.readdirSync(baseDir, { withFileTypes: true }).forEach((versionDir) => {
      if (!versionDir.isDirectory()) return;

      const versionPath = versionDir.name;
      const version: MinecraftInstalledVersion = {
        jarPath: '',
        meta: {},
        isForge: false,
      };
      fs.readdirSync(`${baseDir}\\${versionPath}`).forEach((versionFile) => {
        if (versionFile.endsWith('.jar')) {
          version.jarPath = `${baseDir}\\${versionPath}\\${versionFile}`;
        }

        if (versionFile.endsWith('.json')) {
          const meta = JSON.parse(
            fs
              .readFileSync(`${baseDir}\\${versionPath}\\${versionFile}`)
              .toString()
              .trim()
          );

          version.meta = meta;

          version.isForge =
            meta?.arguments?.game?.includes('forgeclient') ?? false;
        }
      });

      if (version.jarPath && version.meta) {
        versions.push(version);
      }
    });

    return versions;
  } catch (e) {
    return [];
  }
}
