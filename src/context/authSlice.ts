import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../interfaces';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshAccessToken: string | null;
  userInfo: UserResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists in localStorage
  accessToken: localStorage.getItem('token'),
  refreshAccessToken: localStorage.getItem('refreshToken'),
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userInfo: UserResponse ; accessToken: string; refreshAccessToken: string }>,
    ) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.refreshAccessToken = action.payload.refreshAccessToken;

      // Persist tokens in localStorage
      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshAccessToken);
      localStorage.setItem('email', action.payload.userInfo.email);
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshAccessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshAccessToken = action.payload.refreshAccessToken;

      // Persist updated tokens in localStorage
      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshAccessToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshAccessToken = null;

      // Clear tokens from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
    },
  },
});

export const { login, updateTokens, logout } = authSlice.actions;
export default authSlice.reducer;
