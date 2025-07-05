import { renderHook, act } from '@testing-library/react';
import * as authApis from '../../services/apis/authApis';
import { useAuth } from '../auth';

jest.mock('../../services/apis/authApis', () => ({
  login: jest.fn(),
  refreshToken: jest.fn(),
  logout: jest.fn(),
  validateToken: jest.fn(),
  outboundAuthenticate: jest.fn(),
}));

describe('useAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loginUser should call login and return token response', async () => {
    const mockToken = { accessToken: 'token', accessTokenExpiresAt: 123, refreshToken: 'refresh' };
    (authApis.login as jest.Mock).mockResolvedValueOnce({ data: mockToken });

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.loginUser({ email: 'a', password: 'b' });
    });

    expect(authApis.login).toHaveBeenCalledWith({ email: 'a', password: 'b' });
    expect(res).toEqual(mockToken);
    expect(result.current.loading).toBe(false);
  });

  it('refreshUserToken should call refreshToken and return token response', async () => {
    const mockToken = { accessToken: 'token', accessTokenExpiresAt: 123, refreshToken: 'refresh' };
    (authApis.refreshToken as jest.Mock).mockResolvedValueOnce({ data: mockToken });

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.refreshUserToken({ refreshToken: 'refresh' });
    });

    expect(authApis.refreshToken).toHaveBeenCalledWith({ refreshToken: 'refresh' });
    expect(res).toEqual(mockToken);
    expect(result.current.loading).toBe(false);
  });

  it('refreshUserToken should return null on error', async () => {
    (authApis.refreshToken as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.refreshUserToken({ refreshToken: 'refresh' });
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('logoutUser should call logout and return true', async () => {
    (authApis.logout as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.logoutUser({ accessToken: 'a', refreshToken: 'b' });
    });

    expect(authApis.logout).toHaveBeenCalledWith({ accessToken: 'a', refreshToken: 'b' });
    expect(res).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('logoutUser should return false on error', async () => {
    (authApis.logout as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.logoutUser({ accessToken: 'a', refreshToken: 'b' });
    });

    expect(res).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('validateUserToken should call validateToken and return true', async () => {
    (authApis.validateToken as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.validateUserToken('Bearer token');
    });

    expect(authApis.validateToken).toHaveBeenCalledWith('Bearer token');
    expect(res).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('validateUserToken should return false on error', async () => {
    (authApis.validateToken as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.validateUserToken('Bearer token');
    });

    expect(res).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('authenticateWithCode should call outboundAuthenticate and return token response', async () => {
    const mockToken = { accessToken: 'token', accessTokenExpiresAt: 123, refreshToken: 'refresh' };
    (authApis.outboundAuthenticate as jest.Mock).mockResolvedValueOnce({ data: mockToken });

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.authenticateWithCode('code');
    });

    expect(authApis.outboundAuthenticate).toHaveBeenCalledWith('code');
    expect(res).toEqual(mockToken);
    expect(result.current.loading).toBe(false);
  });

  it('authenticateWithCode should return null on error', async () => {
    (authApis.outboundAuthenticate as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useAuth());
    let res: any;
    await act(async () => {
      res = await result.current.authenticateWithCode('code');
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});