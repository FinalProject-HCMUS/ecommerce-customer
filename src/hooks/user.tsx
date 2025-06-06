import { useState } from 'react';
import { userApi } from '../services/apis/userApi';
import { UserResponse } from '../interfaces/user/UserResponse';
import { CreateUserRequest } from '../interfaces/user/CreateUserRequest';
import { UpdateUserRequest } from '../interfaces/user/UpdateUserRequest';
import { ChangePasswordRequest } from '../interfaces/user/ChangePasswordRequest';
import {
  confirmEmail,
  resendConfirmationEmail,
} from '../services/apis/authApis';
import { ResetPasswordRequest } from '../interfaces/auth/ResetPasswordRequest';

export const useUser = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch a single user by ID
  const fetchUserById = async (id: string): Promise<UserResponse | null> => {
    setLoading(true);
    try {
      const response = await userApi.getUserById(id);
      setUser(response.data || null);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single user by token
  const fetchUserByToken = async (): Promise<UserResponse | null> => {
    setLoading(true);
    try {
      const response = await userApi.getUserByToken();
      return response.data || null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const createUser = async (
    data: CreateUserRequest
  ): Promise<UserResponse | null> => {
    setLoading(true);
    try {
      const response = await userApi.createUser(data);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing user
  const updateUser = async (
    id: string,
    data: UpdateUserRequest
  ): Promise<UserResponse | null> => {
    try {
      const response = await userApi.updateUser(id, data);
      return response.data || null;
    } catch {
      return null;
    }
  };

  // Change user password
  const changePassword = async (
    id: string,
    data: ChangePasswordRequest
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await userApi.changePassword(id, data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const confirmUserEmail = async (token: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await confirmEmail(token);
      return response.isSuccess;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resendUserConfirmationEmail = async (
    email: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await resendConfirmationEmail(email);
      return response.isSuccess;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await userApi.requestPasswordReset(email);
      return response.isSuccess;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    data: ResetPasswordRequest
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await userApi.resetPassword(data);
      return response.isSuccess;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    fetchUserById,
    createUser,
    updateUser,
    changePassword,
    fetchUserByToken,
    confirmUserEmail,
    resendUserConfirmationEmail,
    requestPasswordReset,
    resetPassword,
  };
};
