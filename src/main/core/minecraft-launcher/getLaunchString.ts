import path from 'path';
import fs from 'fs';
import {
  MinecraftVanillaVersionManifest,
  MinecraftVersionManifest,
} from 'renderer/entities/minecraft-version';
import { v4 } from 'uuid';
import { isForgeManifest, isString } from './helpers';
import getValidLibraries from './download/getValidLibraries';
import getValidNatives from './download/getValidNatives';

type LaunchArgs = {
  minecraftRoot: string;
  username: string;
  manifest: MinecraftVersionManifest;
};

export default function getLaunchString({
  minecraftRoot,
  username,
  manifest,
}: LaunchArgs) {
  let launchString = `java`;

  const vanillaManifest: MinecraftVanillaVersionManifest = isForgeManifest(
    manifest
  )
    ? JSON.parse(
        fs
          .readFileSync(
            path.resolve(
              minecraftRoot,
              'versions',
              manifest.inheritsFrom,
              `${manifest.inheritsFrom}.json`
            )
          )
          .toString()
      )
    : manifest;

  launchString += ` ${vanillaManifest.arguments.jvm
    .filter(isString)
    .map((argument) =>
      argument
        .replaceAll(
          '${natives_directory}',
          path.resolve(minecraftRoot, 'libraries')
        )
        .replaceAll('${launcher_name}', '"T4 Launcher"')
        .replaceAll('${launcher_version}', '1.1.0')
        .replaceAll(
          '${classpath}',
          [
            ...getValidLibraries(vanillaManifest.libraries).map(
              (library) =>
                `"${path.resolve(
                  minecraftRoot,
                  'libraries',
                  ...library.downloads.artifact.path.split('/')
                )}`
            ),
            ...getValidNatives(vanillaManifest.libraries).map(
              (native) =>
                `"${path.resolve(
                  minecraftRoot,
                  'libraries',
                  ...native.path.split('/')
                )}"`
            ),
            ...(isForgeManifest(manifest)
              ? getValidLibraries(manifest.libraries).map(
                  (library) =>
                    `"${path.resolve(
                      minecraftRoot,
                      'libraries',
                      ...library.downloads.artifact.path.split('/')
                    )}"`
                )
              : []),
            ...(isForgeManifest(manifest)
              ? []
              : [
                  path.resolve(
                    minecraftRoot,
                    'versions',
                    vanillaManifest.id,
                    `${vanillaManifest.id}.jar`
                  ),
                ]),
          ].join(';')
        )
    )
    .join(' ')}`;

  if (isForgeManifest(manifest)) {
    launchString += ` ${manifest.arguments.jvm
      .map((argument) =>
        argument
          .replaceAll('${version_name}', manifest.id)
          .replaceAll(
            '${library_directory}',
            path.resolve(minecraftRoot, 'libraries')
          )
          .replaceAll('${classpath_separator}', ';')
      )
      .join(' ')}`;
  }

  launchString += ` ${manifest.mainClass}`;

  launchString += ` ${vanillaManifest.arguments.game
    .filter(isString)
    .map((argument) =>
      argument
        .replaceAll('${auth_player_name}', username)
        .replaceAll('${version_name}', vanillaManifest.id)
        .replaceAll('${game_directory}', minecraftRoot)
        .replaceAll('${assets_root}', path.resolve(minecraftRoot, 'assets'))
        .replaceAll('${assets_index_name}', vanillaManifest.assetIndex.id)
        .replaceAll('${auth_uuid}', v4())
        .replaceAll('${auth_access_token}', v4())
        .replaceAll('${clientid}', '1.1.0')
        .replaceAll('${auth_xuid}', v4())
        .replaceAll('${user_type}', v4())
        .replaceAll('${version_type}', vanillaManifest.type)
    )
    .join(' ')}`;

  if (isForgeManifest(manifest)) {
    launchString += ` ${manifest.arguments.game.join(' ')}`;
  }

  return launchString;
}

// export default function getLaunchString(minecraftRoot: string) {
//   return `java -Xms256m -Xmx256m -cp "${path.resolve(
//     `${minecraftRoot}\\bin\\minecraft.jar`
//   )}";"${path.resolve(`${minecraftRoot}\\bin\\jinput.jar`)}";"${path.resolve(
//     `${minecraftRoot}\\bin\\lwjgl.jar`
//   )}";"${path.resolve(
//     `${minecraftRoot}\\bin\\lwjgl_util.jar`
//   )}" -Djava.library.path="${minecraftRoot}\\bin\\natives" net.minecraft.client.Minecraft`;
// }
