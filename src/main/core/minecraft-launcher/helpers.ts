import {
  MinecraftForgeVersionManifest,
  MinecraftVersionManifest,
} from 'renderer/entities/minecraft-version';

export function isForgeManifest(
  manifest: MinecraftVersionManifest
): manifest is MinecraftForgeVersionManifest {
  return 'inheritsFrom' in manifest;
}

export function isString(item: string | null | undefined): item is string {
  return typeof item === 'string';
}
