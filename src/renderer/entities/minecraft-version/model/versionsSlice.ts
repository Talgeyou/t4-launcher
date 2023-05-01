import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type VersionsState = {
  items: {
    id: string;
    type: string;
  }[];
};

const initialState: VersionsState = {
  items: [],
};

const versionsSlice = createSlice({
  name: 'versions',
  initialState,
  reducers: {
    setVersions: (
      state,
      action: PayloadAction<{ versions: { id: string; type: string }[] }>
    ) => {
      state.items = action.payload.versions;
    },
  },
});

export const versionsActions = versionsSlice.actions;

export default versionsSlice.reducer;
