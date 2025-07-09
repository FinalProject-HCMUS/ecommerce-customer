import * as authApis from '../authApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

const mockPost = client.post as jest.Mock;

describe('authApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('login should call client.post with correct args and return data', async () => {
    const mockData = {
      accessToken: 'token',
      accessTokenExpiresAt: 123,
      refreshToken: 'refresh',
    };
    mockPost.mockResolvedValueOnce({
      data: {
        timestamp: '',
        httpStatus: 'OK',
        isSuccess: true,
        data: mockData,
      },
    });
    const req = { email: 'a', password: 'b' };
    const res = await authApis.login(req);
    expect(mockPost).toHaveBeenCalledWith('/auth/login', req);
    expect(res.data).toEqual(mockData);
  });

  it('refreshToken should call client.post with correct args and return data', async () => {
    const mockData = {
      accessToken: 'token',
      accessTokenExpiresAt: 123,
      refreshToken: 'refresh',
    };
    mockPost.mockResolvedValueOnce({
      data: {
        timestamp: '',
        httpStatus: 'OK',
        isSuccess: true,
        data: mockData,
      },
    });
    const req = { refreshToken: 'refresh' };
    const res = await authApis.refreshToken(req);
    expect(mockPost).toHaveBeenCalledWith('/auth/refresh-token', req);
    expect(res.data).toEqual(mockData);
  });

  it('logout should call client.post with correct args and return data', async () => {
    mockPost.mockResolvedValueOnce({
      data: { timestamp: '', httpStatus: 'OK', isSuccess: true },
    });
    const req = { accessToken: 'token', refreshToken: 'refresh' };
    const res = await authApis.logout(req);
    expect(mockPost).toHaveBeenCalledWith('/auth/logout', req);
    expect(res.isSuccess).toBe(true);
  });

  it('validateToken should call client.post with correct args and return data', async () => {
    mockPost.mockResolvedValueOnce({
      data: { timestamp: '', httpStatus: 'OK', isSuccess: true },
    });
    const header = 'Bearer token';
    const res = await authApis.validateToken(header);
    expect(mockPost).toHaveBeenCalledWith('/auth/validate-token', null, {
      headers: { Authorization: header },
    });
    expect(res.isSuccess).toBe(true);
  });

  it('confirmEmail should call client.post with correct args and return data', async () => {
    mockPost.mockResolvedValueOnce({
      data: { timestamp: '', httpStatus: 'OK', isSuccess: true },
    });
    const token = 'abc123';
    const res = await authApis.confirmEmail(token);
    expect(mockPost).toHaveBeenCalledWith(
      `/users/confirm-email?token=${encodeURIComponent(token)}`,
      null
    );
    expect(res.isSuccess).toBe(true);
  });

  it('resendConfirmationEmail should call client.post with correct args and return data', async () => {
    mockPost.mockResolvedValueOnce({
      data: { timestamp: '', httpStatus: 'OK', isSuccess: true },
    });
    const email = 'test@example.com';
    const res = await authApis.resendConfirmationEmail(email);
    expect(mockPost).toHaveBeenCalledWith(
      `/users/resend-confirmation?email=${encodeURIComponent(email)}`,
      null
    );
    expect(res.isSuccess).toBe(true);
  });

  it('outboundAuthenticate should call client.post with correct args and return data', async () => {
    const mockData = {
      accessToken: 'token',
      accessTokenExpiresAt: 123,
      refreshToken: 'refresh',
    };
    mockPost.mockResolvedValueOnce({
      data: {
        timestamp: '',
        httpStatus: 'OK',
        isSuccess: true,
        data: mockData,
      },
    });
    const code = 'oauth-code';
    const res = await authApis.outboundAuthenticate(code);
    expect(mockPost).toHaveBeenCalledWith(
      `/auth/outbound/authentication?code=${code}`,
      null
    );
    expect(res.data).toEqual(mockData);
  });
});
