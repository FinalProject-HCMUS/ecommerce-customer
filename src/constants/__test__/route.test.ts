import routeConstants from '../route';

describe('routeConstants', () => {
  test('should export an object', () => {
    expect(routeConstants).toBeDefined();
    expect(typeof routeConstants).toBe('object');
  });

  test('should contain top-level keys', () => {
    const expectedKeys = [
      'HOME',
      'SEARCH',
      'AUTH',
      'PRODUCT',
      'PROFILE',
      'CART',
      'CHECKOUT',
      'CHAT',
      'POLICY',
      'VN_PAY_CHECKOUT_RESULT',
      'BLOG',
      'ORDER',
    ];
    expectedKeys.forEach(key => {
      expect(routeConstants).toHaveProperty(key);
    });
  });

  test('AUTH should contain expected auth routes', () => {
    expect(routeConstants.AUTH).toBeDefined();
    expect(routeConstants.AUTH).toHaveProperty('LOGIN');
    expect(routeConstants.AUTH).toHaveProperty('REGISTER');
    expect(routeConstants.AUTH).toHaveProperty('ACTIVATE_ACCOUNT');
    expect(routeConstants.AUTH).toHaveProperty('CONFIRM_EMAIL');
    expect(routeConstants.AUTH).toHaveProperty('CHANGE_PASSWORD');
    expect(routeConstants.AUTH).toHaveProperty('AUTHENTICATE');
    expect(routeConstants.AUTH).toHaveProperty('RESET_PASSWORD_REQUEST');
    expect(routeConstants.AUTH).toHaveProperty('RESET_PASSWORD');
  });

  test('PRODUCT should contain DETAIL', () => {
    expect(routeConstants.PRODUCT).toBeDefined();
    expect(routeConstants.PRODUCT).toHaveProperty('DETAIL');
  });

  test('BLOG should contain LIST and DETAIL', () => {
    expect(routeConstants.BLOG).toBeDefined();
    expect(routeConstants.BLOG).toHaveProperty('LIST');
    expect(routeConstants.BLOG).toHaveProperty('DETAIL');
  });

  test('ORDER should contain ROOT and CONFIRMATION', () => {
    expect(routeConstants.ORDER).toBeDefined();
    expect(routeConstants.ORDER).toHaveProperty('ROOT');
    expect(routeConstants.ORDER).toHaveProperty('CONFIRMATION');
  });

  test('should match snapshot', () => {
    expect(routeConstants).toMatchSnapshot();
  });
});