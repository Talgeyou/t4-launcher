import { configureStore } from '@reduxjs/toolkit';
import { accountReducer } from 'renderer/entities/account';
import { versionsReducer } from 'renderer/entities/minecraft-version';
import { profilesReducer } from 'renderer/entities/profile';
import { systemReducer } from 'renderer/entities/system';

const store = configureStore({
  reducer: {
    system: systemReducer,
    account: accountReducer,
    profiles: profilesReducer,
    versions: versionsReducer,
  },
});

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
