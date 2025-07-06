import routes from './router';
import routeConstants from '../constants/route';

describe('App Routes', () => {
  it('should contain Home route', () => {
    const home = routes.find(r => r.path === routeConstants.HOME);
    expect(home).toBeDefined();
    expect(home?.name).toBe('Home');
  });

  it('should contain Login and Register routes', () => {
    const login = routes.find(r => r.path === routeConstants.AUTH.LOGIN);
    const register = routes.find(r => r.path === routeConstants.AUTH.REGISTER);
    expect(login).toBeDefined();
    expect(register).toBeDefined();
    expect(login?.name).toBe('Login');
    expect(register?.name).toBe('Register');
  });

  it('should contain error pages', () => {
    const page403 = routes.find(r => r.path === '/403');
    const page500 = routes.find(r => r.path === '/500');
    expect(page403).toBeDefined();
    expect(page500).toBeDefined();
    expect(page403?.name).toBe('Page 403');
    expect(page500?.name).toBe('Page 500');
  });

  it('should contain all expected route paths', () => {
    const expectedPaths = [
      routeConstants.HOME,
      routeConstants.SEARCH,
      routeConstants.AUTH.LOGIN,
      routeConstants.AUTH.REGISTER,
      routeConstants.PRODUCT.DETAIL,
      routeConstants.PROFILE,
      routeConstants.CART,
      routeConstants.CHECKOUT,
      routeConstants.CHAT,
      routeConstants.POLICY,
      routeConstants.VN_PAY_CHECKOUT_RESULT,
      routeConstants.BLOG.LIST,
      routeConstants.BLOG.DETAIL,
      '/403',
      '/500',
      routeConstants.ORDER.ROOT,
      routeConstants.AUTH.ACTIVATE_ACCOUNT,
      routeConstants.AUTH.CONFIRM_EMAIL,
      routeConstants.AUTH.CHANGE_PASSWORD,
      routeConstants.AUTH.AUTHENTICATE,
      routeConstants.ORDER.CONFIRMATION,
      routeConstants.AUTH.RESET_PASSWORD_REQUEST,
      routeConstants.AUTH.RESET_PASSWORD,
    ];
    expectedPaths.forEach(path => {
      expect(routes.some(r => r.path === path)).toBe(true);
    });
  });
});