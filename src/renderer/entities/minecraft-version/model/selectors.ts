export function selectVersions(store: RootStore) {
  return store.versions.items;
}

export function selectVersionById(store: RootStore, id: string) {
  return store.versions.items.find((item) => item.id === id);
}
