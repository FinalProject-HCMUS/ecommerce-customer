import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { UserResponse } from '../../interfaces/user/UserResponse';
import { CreateUserRequest } from '../../interfaces/user/CreateUserRequest';
import { UpdateUserRequest } from '../../interfaces/user/UpdateUserRequest';
import { ChangePasswordRequest } from '../../interfaces/user/ChangePasswordRequest';

const BASE_URL = '/users';

export const userApi = {
  // Get user by ID
  getUserById: async (id: string): Promise<CustomResponse<UserResponse>> => {
    const response = await client.get<CustomResponse<UserResponse>>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Create a new user
  createUser: async (data: CreateUserRequest): Promise<CustomResponse<UserResponse>> => {
    const response = await client.post<CustomResponse<UserResponse>>(BASE_URL, data);
    return response.data;
  },

  // Update an existing user
  updateUser: async (id: string, data: UpdateUserRequest): Promise<CustomResponse<UserResponse>> => {
    const response = await client.put<CustomResponse<UserResponse>>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // Change user password
  changePassword: async (id: string, data: ChangePasswordRequest): Promise<CustomResponse<void>> => {
    const response = await client.post<CustomResponse<void>>(`${BASE_URL}/${id}/change-password`, data);
    return response.data;
  },
};