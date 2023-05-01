import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Account } from '../types';

type AccountState = Account;

const initialState: AccountState = {
  username: 'Player',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<{ account: Account }>) => {
      return { ...action.payload.account };
    },
    setUsername: (
      state,
      action: PayloadAction<{ minecraftRoot: string; username: string }>
    ) => {
      state.username = action.payload.username;

      try {
        if (window.electrolAPI.updateAccount) {
          window.electrolAPI.updateAccount(action.payload.minecraftRoot, {
            ...state,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
