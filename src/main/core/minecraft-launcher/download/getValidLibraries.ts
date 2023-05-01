import {
  MinecraftVersionManifestLibrary,
  MinecraftVersionManifestLibraryRule,
} from 'renderer/entities/minecraft-version';

function isMatchRules(rules?: MinecraftVersionManifestLibraryRule[]) {
  if (!rules) {
    return true;
  }

  return rules.every((rule) => {
    let isMatch = false;

    switch (rule.os?.name) {
      case 'windows': {
        const samePlatform = process.platform === 'win32';

        if (rule.action === 'disallow' && samePlatform) {
          isMatch = !samePlatform;
        }

        if (rule.action === 'allow' && samePlatform) {
          isMatch = samePlatform;
        }
        break;
      }
      case 'linux': {
        const samePlatform = process.platform === 'linux';

        if (rule.action === 'disallow' && samePlatform) {
          isMatch = !samePlatform;
        }

        if (rule.action === 'allow' && samePlatform) {
          isMatch = samePlatform;
        }
        break;
      }
      case 'osx': {
        const samePlatform = process.platform === 'darwin';

        if (rule.action === 'disallow') {
          isMatch = !samePlatform;
        }

        if (rule.action === 'allow') {
          isMatch = samePlatform;
        }
        break;
      }
      default: {
        if (rule.action === 'allow') {
          isMatch = true;
        }

        if (rule.action === 'disallow') {
          isMatch = false;
        }
      }
    }

    return isMatch;
  });
}

export default function getValidLibraries(
  libraries: MinecraftVersionManifestLibrary[]
) {
  return libraries.filter((library) => isMatchRules(library.rules));
}
