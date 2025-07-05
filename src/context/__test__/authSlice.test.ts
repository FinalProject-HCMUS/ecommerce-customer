import reducer, { login, logout, updateTokens, updateUserInfo } from '../authSlice';
import localStorageConstants from '../../constants/localStorage';
import { Role, UserResponse } from '../../interfaces';

describe('authSlice', () => {
  // Provide a fully mocked UserResponse object
  const userInfo: UserResponse = {
    id: '1',
    email: 'test@example.com',
    phoneNumber: '0123456789',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test St',
    weight: 70,
    height: 175,
    enabled: true,
    photo: 'avatar.png',
    role: Role.USER,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should handle login', () => {
    const action = login({
      userInfo,
      accessToken: 'access-token',
      refreshAccessToken: 'refresh-token',
    });
    const state = reducer(undefined, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.accessToken).toBe('access-token');
    expect(state.refreshAccessToken).toBe('refresh-token');
    expect(state.userInfo).toEqual(userInfo);

    expect(localStorage.getItem(localStorageConstants.TOKEN)).toBe('access-token');
    expect(localStorage.getItem(localStorageConstants.REFRESH_TOKEN)).toBe('refresh-token');
    expect(localStorage.getItem(localStorageConstants.EMAIL)).toBe(userInfo.email);
    expect(localStorage.getItem(localStorageConstants.USER_INFO)).toBe(JSON.stringify(userInfo));
  });

  test('should handle updateUserInfo', () => {
    const prevState = {
      isAuthenticated: true,
      accessToken: 'access-token',
      refreshAccessToken: 'refresh-token',
      userInfo: userInfo,
    };
    const updatedUser = { ...userInfo, firstName: 'Updated' };
    const action = updateUserInfo(updatedUser);
    const state = reducer(prevState, action);

    expect(state.userInfo).toEqual(updatedUser);
    expect(localStorage.getItem(localStorageConstants.USER_INFO)).toBe(JSON.stringify(updatedUser));
  });

  test('should handle updateTokens', () => {
    const prevState = {
      isAuthenticated: true,
      accessToken: 'old-access-token',
      refreshAccessToken: 'old-refresh-token',
      userInfo: userInfo,
    };
    const action = updateTokens({
      accessToken: 'new-access-token',
      refreshAccessToken: 'new-refresh-token',
    });
    const state = reducer(prevState, action);

    expect(state.accessToken).toBe('new-access-token');
    expect(state.refreshAccessToken).toBe('new-refresh-token');
    expect(localStorage.getItem(localStorageConstants.TOKEN)).toBe('new-access-token');
    expect(localStorage.getItem(localStorageConstants.REFRESH_TOKEN)).toBe('new-refresh-token');
  });

  test('should handle logout', () => {
    localStorage.setItem(localStorageConstants.TOKEN, 'token');
    localStorage.setItem(localStorageConstants.REFRESH_TOKEN, 'refresh');
    localStorage.setItem(localStorageConstants.EMAIL, 'email');
    localStorage.setItem(localStorageConstants.USER_INFO, JSON.stringify(userInfo));

    const prevState = {
      isAuthenticated: true,
      accessToken: 'access-token',
      refreshAccessToken: 'refresh-token',
      userInfo: userInfo,
    };
    const state = reducer(prevState, logout());

    expect(state.isAuthenticated).toBe(false);
    expect(state.accessToken).toBeNull();
    expect(state.refreshAccessToken).toBeNull();
    expect(state.userInfo).toBeNull();

    expect(localStorage.getItem(localStorageConstants.TOKEN)).toBeNull();
    expect(localStorage.getItem(localStorageConstants.REFRESH_TOKEN)).toBeNull();
    expect(localStorage.getItem(localStorageConstants.EMAIL)).toBeNull();
    expect(localStorage.getItem(localStorageConstants.USER_INFO)).toBeNull();
  });
});