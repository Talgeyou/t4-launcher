import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../types';

type ProfilesState = {
  items: Record<string, Profile>;
  selectedProfile: {
    id: string;
    profile: Profile;
  } | null;
};

const initialState: ProfilesState = {
  items: {},
  selectedProfile: null,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    createProfile: (
      state,
      action: PayloadAction<{
        minecraftRoot: string;
        profileId: string;
        profile: Profile;
      }>
    ) => {
      state.items[action.payload.profileId] = action.payload.profile;

      if (window.electrolAPI.updateProfiles) {
        window.electrolAPI.updateProfiles(
          action.payload.minecraftRoot,
          JSON.parse(JSON.stringify(state.items))
        );
      }
    },
    setProfiles: (
      state,
      action: PayloadAction<{ profiles: Record<string, Profile> }>
    ) => {
      state.items = action.payload.profiles;
    },
    selectProfile: (state, action: PayloadAction<{ profileId: string }>) => {
      const profile = state.items[action.payload.profileId];
      state.selectedProfile = profile
        ? {
            id: action.payload.profileId,
            profile,
          }
        : null;
    },
    updateProfile: (
      state,
      action: PayloadAction<{
        minecraftRoot: string;
        profileId: string;
        profile: Partial<Profile>;
      }>
    ) => {
      const profile = state.items[action.payload.profileId];

      if (profile) {
        state.items[action.payload.profileId] = {
          ...profile,
          ...action.payload.profile,
        };

        if (window.electrolAPI.updateProfiles) {
          window.electrolAPI.updateProfiles(
            action.payload.minecraftRoot,
            JSON.parse(JSON.stringify(state.items))
          );
        }
      }
    },
  },
});

export const profilesActions = profilesSlice.actions;

export default profilesSlice.reducer;
