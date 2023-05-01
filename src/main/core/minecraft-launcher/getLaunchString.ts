import path from 'path';

type LaunchArgs = {
  minecraftRoot: string;
  nativesPath: string;
  libraryPaths: string[];
  jarPath: string;
  mainClass: string;
  username: string;
  versionId: string;
  assetsIndex: string;
};

export default function getLaunchString({
  minecraftRoot,
  nativesPath,
  libraryPaths,
  jarPath,
  mainClass,
  username,
  versionId,
  assetsIndex,
}: LaunchArgs) {
  let launchString = `java`;

  // Memory
  launchString += ` -Xmx2G -Xms2G`;
  // OS Version
  launchString += ' -Dos.name="Windows 10" -Dos.version="10.0"';
  // Natives path
  launchString += ` -cp ${libraryPaths
    .map((libraryPath) => `"${path.resolve(libraryPath)}"`)
    .join(';')};"${jarPath}"`;
  launchString += ` -Djava.library.path="${path.resolve(
    `${nativesPath}\\natives`
  )}"`;
  // Launcher Brand
  launchString += ` -Dminecraft.launcher.brand="t4-launcher"`;
  // Launcher Version
  launchString += ` -Dminecraft.launcher.version="1.0.0"`;

  launchString += ` ${mainClass}`;
  launchString += ` --username ${username}`;
  launchString += ' --session OFFLINE_MODE';
  launchString += ` --version ${versionId}`;
  launchString += ` --gameDir "${path.resolve(minecraftRoot)}"`;
  launchString += ` --assetsDir "${path.resolve(`${minecraftRoot}\\assets`)}"`;
  launchString += ` --assetIndex "${assetsIndex}"`;
  launchString += ` --accessToken ${username}`;

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
