export function selectProfileById(store: RootStore, id: string) {
  return store.profiles.items[id];
}

export function selectProfiles(store: RootStore) {
  return store.profiles.items;
}

export function selectSelectedProfile(store: RootStore) {
  return store.profiles.selectedProfile;
}
