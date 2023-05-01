/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { MinecraftInstalledVersion } from 'renderer/entities/minecraft-version';
import { Profile } from 'renderer/entities/profile';
import { Account } from 'renderer/entities/account';
import {
  launchMinecraft,
  MinecraftLaunchParams,
  getInstalledVersions,
  getAvailableVersions,
} from './core/minecraft-launcher';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  AppEventName,
  MinecraftDownloadAssetEventName,
  MinecraftDownloadAssetIndexEventName,
  MinecraftDownloadLibraryEventName,
  MinecraftDownloadManifestEventName,
  MinecraftDownloadSizeEventName,
  MinecraftDownloadVanillaJarEventName,
  MinecraftLaunchEventName,
} from './types';
import updateProfiles from './core/minecraft-launcher/profiles/updateProfiles';
import updateAccount from './core/minecraft-launcher/account/updateAccount';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.handle('getSystemPaths', () => ({ appData: app.getPath('appData') }));

ipcMain.handle(
  'getInstalledVersions',
  (event, minecraftRoot: string): MinecraftInstalledVersion[] => {
    return getInstalledVersions(minecraftRoot);
  }
);
ipcMain.handle('getAvailableVersions', () => {
  return getAvailableVersions();
});

ipcMain.handle('getProfiles', (event, minecraftRoot: string) => {
  const filePath = `${minecraftRoot}\\launcher_profiles.json`;
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath).toString());
  }

  const defaultProfiles = {
    profiles: {},
  };

  fs.writeFileSync(filePath, JSON.stringify(defaultProfiles));

  return defaultProfiles;
});
ipcMain.handle(
  'updateProfiles',
  (event, minecraftRoot: string, profiles: Record<string, Profile>) => {
    updateProfiles(minecraftRoot, profiles);
  }
);

ipcMain.handle('getAccount', (event, minecraftRoot: string) => {
  const filePath = `${minecraftRoot}\\t4-launcher_account.json`;
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath).toString());
  }

  const defaultAccount = {
    username: 'Player',
  };

  fs.writeFileSync(filePath, JSON.stringify(defaultAccount));

  return defaultAccount;
});
ipcMain.handle(
  'updateAccount',
  (event, minecraftRoot: string, account: Account) => {
    updateAccount(minecraftRoot, account);
  }
);

function initLaunchMinecraftHandler(window: BrowserWindow) {
  ipcMain.handle('launchMinecraft', (event, params: MinecraftLaunchParams) => {
    return launchMinecraft(params, {
      onLaunchStart: (versionId) => {
        window.webContents.send(MinecraftLaunchEventName.Start, { versionId });
      },
      onLaunchFinish: (versionId) => {
        window.webContents.send(MinecraftLaunchEventName.Finish, { versionId });
      },
      onLaunchError: (versionId, error) => {
        window.webContents.send(
          MinecraftLaunchEventName.Error,
          {
            versionId,
          },
          error && 'message' in error
            ? error.message
            : new Error(`Unexpected error happened with launch ${versionId}`)
                .message
        );
      },
      download: {
        onError: (versionId, error) => {
          window.webContents.send(
            MinecraftLaunchEventName.Error,
            { versionId },
            error && typeof error === 'object' && 'message' in error
              ? error.message
              : `Unexpected error happened with launch ${versionId}`
          );
        },
        manifest: {
          onFoundExisting: (manifest) => {
            window.webContents.send(
              MinecraftDownloadManifestEventName.FoundExisting,
              manifest
            );
          },
          onDownloadStart: (manifest) => {
            window.webContents.send(
              MinecraftDownloadManifestEventName.Start,
              manifest
            );
          },
          onDownloadFinish: (manifest) => {
            window.webContents.send(
              MinecraftDownloadManifestEventName.Finish,
              manifest
            );
          },
          onError: (manifest, error) => {
            window.webContents.send(
              MinecraftDownloadManifestEventName.Error,
              manifest,
              error && 'message' in error
                ? error.message
                : new Error(
                    `Unexpected error happened with downloading manifest for ${manifest.versionId}`
                  ).message
            );
          },
        },
        jar: {
          onFoundExisting: (jar) => {
            window.webContents.send(
              MinecraftDownloadVanillaJarEventName.FoundExisting,
              jar
            );
          },
          onDownloadStart: (jar) => {
            window.webContents.send(
              MinecraftDownloadVanillaJarEventName.Start,
              jar
            );
          },
          onDownloadFinish: (jar) => {
            window.webContents.send(
              MinecraftDownloadVanillaJarEventName.Finish,
              jar
            );
          },
          onError: (jar, error) => {
            window.webContents.send(
              MinecraftDownloadVanillaJarEventName.Error,
              jar,
              error && 'message' in error
                ? error.message
                : new Error(
                    `Unexpected error happened with downloading jar for ${jar.versionId}`
                  ).message
            );
          },
        },
        library: {
          onFoundExisting: (library) => {
            window.webContents.send(
              MinecraftDownloadLibraryEventName.FoundExisting,
              library
            );
          },
          onDownloadStart: (library) => {
            window.webContents.send(
              MinecraftDownloadLibraryEventName.Start,
              library
            );
          },
          onDownloadFinish: (library) => {
            window.webContents.send(
              MinecraftDownloadLibraryEventName.Finish,
              library
            );
          },
          onError: (library, error) => {
            window.webContents.send(
              MinecraftDownloadLibraryEventName.Error,
              library,
              error && 'message' in error
                ? error.message
                : new Error(
                    `Unexpected error happened with downloading library ${library.size}`
                  ).message
            );
          },
        },
        assetIndex: {
          onFoundExisting: (assetIndex) => {
            window.webContents.send(
              MinecraftDownloadAssetIndexEventName.FoundExisting,
              assetIndex
            );
          },
          onDownloadStart: (assetIndex) => {
            window.webContents.send(
              MinecraftDownloadAssetIndexEventName.Start,
              assetIndex
            );
          },
          onDownloadFinish: (assetIndex) => {
            window.webContents.send(
              MinecraftDownloadAssetIndexEventName.Finish,
              assetIndex
            );
          },
          onError: (assetIndex, error) => {
            window.webContents.send(
              MinecraftDownloadAssetIndexEventName.Error,
              assetIndex,
              error && 'message' in error
                ? error.message
                : new Error(
                    `Unexpected error happened with downloading assetIndex with id ${assetIndex.assetIndexId}`
                  ).message
            );
          },
        },
        asset: {
          onFoundExisting: (asset) => {
            window.webContents.send(
              MinecraftDownloadAssetEventName.FoundExisting,
              asset
            );
          },
          onDownloadStart: (asset) => {
            window.webContents.send(
              MinecraftDownloadAssetEventName.Start,
              asset
            );
          },
          onDownloadFinish: (asset) => {
            window.webContents.send(
              MinecraftDownloadAssetEventName.Finish,
              asset
            );
          },
          onError: (asset, error) => {
            window.webContents.send(
              MinecraftDownloadAssetEventName.Error,
              asset,
              error && 'message' in error
                ? error.message
                : new Error(
                    `Unexpected error happened with downloading asset ${asset.name} hash: ${asset.hash}`
                  ).message
            );
          },
        },
        onCalculatedDownloadSize: (size) => {
          window.webContents.send(MinecraftDownloadSizeEventName.Calculate, {
            size,
          });
        },
      },
    });
  });
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS'];

//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload
//     )
//     .catch(console.log);
// };

const createWindow = async () => {
  // if (isDebug) {
  //   await installExtensions();
  // }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    transparent: true,
    frame: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    initLaunchMinecraftHandler(mainWindow);

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('show', () => {
    ipcMain.on(AppEventName.Minimize, () => {
      mainWindow?.minimize();
    });

    ipcMain.on(AppEventName.Maximize, () => {
      if (mainWindow?.isMaximized()) {
        return mainWindow.unmaximize();
      }

      return mainWindow?.maximize();
    });

    ipcMain.on(AppEventName.Close, () => {
      app.quit();
    });
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.error);
