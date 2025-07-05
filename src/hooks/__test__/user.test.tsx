import { renderHook, act } from '@testing-library/react';
import { useUser } from '../user';
import { userApi } from '../../services/apis/userApi';
import * as authApis from '../../services/apis/authApis';
import { Role } from '../../interfaces';

jest.mock('../../services/apis/userApi', () => ({
  userApi: {
    getUserById: jest.fn(),
    getUserByToken: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    changePassword: jest.fn(),
    requestPasswordReset: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

jest.mock('../../services/apis/authApis', () => ({
  confirmEmail: jest.fn(),
  resendConfirmationEmail: jest.fn(),
}));

describe('useUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchUserById should call userApi.getUserById and set user', async () => {
    const mockUser = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B', phoneNumber: '123', enabled: true, role: 'USER', createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' };
    (userApi.getUserById as jest.Mock).mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.fetchUserById('1');
    });

    expect(userApi.getUserById).toHaveBeenCalledWith('1');
    expect(result.current.user).toEqual(mockUser);
    expect(res).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('fetchUserById should return null on error', async () => {
    (userApi.getUserById as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.fetchUserById('1');
    });

    expect(res).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetchUserByToken should call userApi.getUserByToken and return user', async () => {
    const mockUser = { id: '2', email: 'b@b.com', firstName: 'B', lastName: 'C', phoneNumber: '456', enabled: true, role: 'USER', createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' };
    (userApi.getUserByToken as jest.Mock).mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.fetchUserByToken();
    });

    expect(userApi.getUserByToken).toHaveBeenCalled();
    expect(res).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });



  it('createUser should call userApi.createUser and return user', async () => {
    const mockUser = { id: '3', email: 'c@b.com', firstName: 'C', lastName: 'D', phoneNumber: '789', enabled: true, role: Role.USER, createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' };
    (userApi.createUser as jest.Mock).mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.createUser({ email: 'c@b.com', firstName: 'C', lastName: 'D', phoneNumber: '789', password: '12345678', role: Role.USER });
    });

    expect(userApi.createUser).toHaveBeenCalled();
    expect(res).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('createUser should return null on error', async () => {
    (userApi.createUser as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.createUser({ email: 'fail', firstName: '', lastName: '', phoneNumber: '', password: '', role: Role.USER });
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('confirmUserEmail should call confirmEmail and return isSuccess', async () => {
    (authApis.confirmEmail as jest.Mock).mockResolvedValueOnce({ isSuccess: true });

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.confirmUserEmail('token');
    });

    expect(authApis.confirmEmail).toHaveBeenCalledWith('token');
    expect(res).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('confirmUserEmail should return false on error', async () => {
    (authApis.confirmEmail as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.confirmUserEmail('token');
    });

    expect(res).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('resendUserConfirmationEmail should call resendConfirmationEmail and return isSuccess', async () => {
    (authApis.resendConfirmationEmail as jest.Mock).mockResolvedValueOnce({ isSuccess: true });

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.resendUserConfirmationEmail('a@b.com');
    });

    expect(authApis.resendConfirmationEmail).toHaveBeenCalledWith('a@b.com');
    expect(res).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('resendUserConfirmationEmail should return false on error', async () => {
    (authApis.resendConfirmationEmail as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.resendUserConfirmationEmail('a@b.com');
    });

    expect(res).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('requestPasswordReset should call userApi.requestPasswordReset and return isSuccess', async () => {
    (userApi.requestPasswordReset as jest.Mock).mockResolvedValueOnce({ isSuccess: true });

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.requestPasswordReset('a@b.com');
    });

    expect(userApi.requestPasswordReset).toHaveBeenCalledWith('a@b.com');
    expect(res).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('requestPasswordReset should return false on error', async () => {
    (userApi.requestPasswordReset as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useUser());
    let res: any;
    await act(async () => {
      res = await result.current.requestPasswordReset('a@b.com');
    });

    expect(res).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});