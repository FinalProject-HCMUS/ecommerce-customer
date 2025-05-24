import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { TokenResponse } from '../../interfaces/auth/TokenResponse';
import { LoginRequest } from '../../interfaces/auth/LoginRequest';
import { TokenRefreshRequest } from '../../interfaces/auth/TokenRefreshRequest';
import { TokenInvalidateRequest } from '../../interfaces/auth/TokenInvalidateRequest';

// Login a user
export const login = async (
  data: LoginRequest
): Promise<CustomResponse<TokenResponse>> => {
  const response = await client.post<CustomResponse<TokenResponse>>(
    '/auth/login',
    data
  );
  return response.data;
};

// Refresh a token
export const refreshToken = async (
  data: TokenRefreshRequest
): Promise<CustomResponse<TokenResponse>> => {
  const response = await client.post<CustomResponse<TokenResponse>>(
    '/auth/refresh-token',
    data
  );
  return response.data;
};

// Logout a user
export const logout = async (
  data: TokenInvalidateRequest
): Promise<CustomResponse<void>> => {
  const response = await client.post<CustomResponse<void>>(
    '/auth/logout',
    data
  );
  return response.data;
};

// Validate a token
export const validateToken = async (
  authorizationHeader: string
): Promise<CustomResponse<void>> => {
  const response = await client.post<CustomResponse<void>>(
    '/auth/validate-token',
    null,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
  return response.data;
};

export const confirmEmail = async (
  token: string
): Promise<CustomResponse<void>> => {
  const response = await client.post<CustomResponse<void>>(
    `/users/confirm-email?token=${encodeURIComponent(token)}`,
    null
  );
  return response.data;
};

export const resendConfirmationEmail = async (
  email: string
): Promise<CustomResponse<void>> => {
  const response = await client.post<CustomResponse<void>>(
    `/users/resend-confirmation?email=${encodeURIComponent(email)}`,
    null
  );
  return response.data;
};
