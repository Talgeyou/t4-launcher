import {
  MinecraftArtifact,
  MinecraftVersionManifestLibrary,
} from 'renderer/entities/minecraft-version';

export default function getValidNatives(
  libraries: MinecraftVersionManifestLibrary[]
) {
  const natives: MinecraftArtifact[] = [];

  libraries.forEach((library) => {
    if (library.natives && library.downloads.classifiers) {
      switch (process.platform) {
        case 'win32': {
          if (
            library.natives.windows &&
            library.downloads.classifiers[
              library.natives.windows as 'natives-windows'
            ]
          ) {
            natives.push(
              library.downloads.classifiers[
                library.natives.windows as 'natives-windows'
              ]
            );
          }
          break;
        }
        default: {
          console.log('No natives');
        }
      }
    }
  });

  return natives;
}
