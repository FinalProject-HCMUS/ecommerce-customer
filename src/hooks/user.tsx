import { useState } from 'react';
import { userApi } from '../services/apis/userApi';
import { UserResponse } from '../interfaces/user/UserResponse';
import { CreateUserRequest } from '../interfaces/user/CreateUserRequest';
import { UpdateUserRequest } from '../interfaces/user/UpdateUserRequest';
import { ChangePasswordRequest } from '../interfaces/user/ChangePasswordRequest';

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
      setUser(response.data || null);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const createUser = async (data: CreateUserRequest): Promise<UserResponse | null> => {
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
  const updateUser = async (id: string, data: UpdateUserRequest): Promise<UserResponse | null> => {
    setLoading(true);
    try {
      const response = await userApi.updateUser(id, data);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Change user password
  const changePassword = async (id: string, data: ChangePasswordRequest): Promise<boolean> => {
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

  return {
    user,
    loading,
    fetchUserById,
    createUser,
    updateUser,
    changePassword,
    fetchUserByToken,
  };
};
