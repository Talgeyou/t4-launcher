export function selectSystemPaths(store: RootStore) {
  return store.system.paths;
}

export function selectAppDataPath(store: RootStore) {
  return store.system.paths.appData;
}
