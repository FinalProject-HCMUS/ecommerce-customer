import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../interfaces';
import localStorageConstants from '../constants/localStorage';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshAccessToken: string | null;
  userInfo: UserResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem(localStorageConstants.TOKEN),
  accessToken: localStorage.getItem(localStorageConstants.TOKEN),
  refreshAccessToken: localStorage.getItem(localStorageConstants.REFRESH_TOKEN),
  userInfo: localStorage.getItem(localStorageConstants.USER_INFO)
    ? JSON.parse(
        localStorage.getItem(localStorageConstants.USER_INFO) as string
      )
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userInfo: UserResponse;
        accessToken: string;
        refreshAccessToken: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.refreshAccessToken = action.payload.refreshAccessToken;

      // Persist tokens in localStorage
      localStorage.setItem(
        localStorageConstants.TOKEN,
        action.payload.accessToken
      );
      localStorage.setItem(
        localStorageConstants.REFRESH_TOKEN,
        action.payload.refreshAccessToken
      );
      localStorage.setItem(
        localStorageConstants.EMAIL,
        action.payload.userInfo.email
      );
      localStorage.setItem(
        localStorageConstants.USER_INFO,
        JSON.stringify(action.payload.userInfo)
      );
    },
    updateTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshAccessToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshAccessToken = action.payload.refreshAccessToken;

      localStorage.setItem(
        localStorageConstants.TOKEN,
        action.payload.accessToken
      );
      localStorage.setItem(
        localStorageConstants.REFRESH_TOKEN,
        action.payload.refreshAccessToken
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshAccessToken = null;

      localStorage.removeItem(localStorageConstants.TOKEN);
      localStorage.removeItem(localStorageConstants.REFRESH_TOKEN);
      localStorage.removeItem(localStorageConstants.EMAIL);
    },
  },
});

export const { login, updateTokens, logout } = authSlice.actions;
export default authSlice.reducer;
