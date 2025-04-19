import { useState } from 'react';
import { login, refreshToken, logout, validateToken } from '../services/apis/authApis';
import { LoginRequest } from '../interfaces/auth/LoginRequest';
import { TokenResponse } from '../interfaces/auth/TokenResponse';
import { TokenRefreshRequest } from '../interfaces/auth/TokenRefreshRequest';
import { TokenInvalidateRequest } from '../interfaces/auth/TokenInvalidateRequest';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // Login a user
  const loginUser = async (data: LoginRequest): Promise<TokenResponse | null> => {
    setLoading(true);
    try {
      const response = await login(data);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Refresh a token
  const refreshUserToken = async (data: TokenRefreshRequest): Promise<TokenResponse | null> => {
    setLoading(true);
    try {
      const response = await refreshToken(data);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Logout a user
  const logoutUser = async (data: TokenInvalidateRequest): Promise<boolean> => {
    setLoading(true);
    try {
      await logout(data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Validate a token
  const validateUserToken = async (authorizationHeader: string): Promise<boolean> => {
    setLoading(true);
    try {
      await validateToken(authorizationHeader);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginUser,
    refreshUserToken,
    logoutUser,
    validateUserToken,
  };
};
