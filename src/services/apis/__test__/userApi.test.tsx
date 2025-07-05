import { userApi } from '../userApi';
import client from '../request';
import { Role } from '../../../interfaces/user/Role';
import { UpdateUserRequest } from '../../../interfaces/user/UpdateUserRequest';
import { CustomResponse, UserResponse } from '../../../interfaces';
import { ChangePasswordRequest } from '../../../interfaces/user/ChangePasswordRequest';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;
const mockPost = client.post as jest.Mock;
const mockPut = client.put as jest.Mock;

describe('userApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getUserById should call client.get with correct url and return data', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      phoneNumber: '0123456789',
      firstName: 'Test',
      lastName: 'User',
      enabled: true,
      role: Role.USER,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      createdBy: 'admin',
      updatedBy: 'admin',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockUser,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await userApi.getUserById('1');
    expect(mockGet).toHaveBeenCalledWith('/users/1');
    expect(res).toEqual(mockResponse);
  });

  it('getUserByToken should call client.get with correct url and return data', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      phoneNumber: '0123456789',
      firstName: 'Test',
      lastName: 'User',
      enabled: true,
      role: Role.USER,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      createdBy: 'admin',
      updatedBy: 'admin',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockUser,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await userApi.getUserByToken();
    expect(mockGet).toHaveBeenCalledWith('/users/me');
    expect(res).toEqual(mockResponse);
  });

  it('createUser should call client.post with correct args and return data', async () => {
    const req = {
      email: 'test@example.com',
      phoneNumber: '0123456789',
      firstName: 'Test',
      lastName: 'User',
      password: 'password',
      role: Role.USER,
    };
    const mockUser = {
      ...req,
      id: '1',
      enabled: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      createdBy: 'admin',
      updatedBy: 'admin',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockUser,
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const res = await userApi.createUser(req);
    expect(mockPost).toHaveBeenCalledWith('/users', req);
    expect(res).toEqual(mockResponse);
  });

  it('updateUser should call client.put with correct args and return data', async () => {
    const req : UpdateUserRequest = {
      firstName: 'Updated',
      lastName: 'User',
      phoneNumber: '0987654321',
    };
    const mockUser : UserResponse= {
      id: '1',
      email: 'test@example.com',
      phoneNumber: '0123456789',
      firstName: 'Updated',
      lastName: 'User',
      enabled: true,
      role: Role.USER,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      createdBy: 'admin',
      updatedBy: 'admin',
    };
    const mockResponse: CustomResponse<UserResponse> = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockUser,
    };
    mockPut.mockResolvedValueOnce({ data: mockResponse });

    const res = await userApi.updateUser('1', req);
    expect(mockPut).toHaveBeenCalledWith('/users/1', req);
    expect(res).toEqual(mockResponse);
  });

  it('changePassword should call client.post with correct args and return data', async () => {
    const req : ChangePasswordRequest = { currentPassword: 'old', newPassword: 'new', confirmPassword: 'new' };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const res = await userApi.changePassword('1', req);
    expect(mockPost).toHaveBeenCalledWith('/users/1/change-password', req);
    expect(res).toEqual(mockResponse);
  });

  it('requestPasswordReset should call client.post with correct url and return data', async () => {
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const email = 'test@example.com';
    const res = await userApi.requestPasswordReset(email);
    expect(mockPost).toHaveBeenCalledWith('/users/request-password-reset?email=test%40example.com');
    expect(res).toEqual(mockResponse);
  });

});