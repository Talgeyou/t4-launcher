import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export type SystemPaths = {
  appData: string;
};

type SystemState = {
  paths: SystemPaths;
};

const initialState: SystemState = {
  paths: {
    appData: '',
  },
};

export const systemSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPaths: (state, action: PayloadAction<SystemPaths>) => {
      state.paths = action.payload;
    },
  },
});

export const systemActions = systemSlice.actions;

export default systemSlice.reducer;
