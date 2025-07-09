import common from '../common';

describe('common constants', () => {
  test('should export an object with all expected properties', () => {
    expect(common).toBeDefined();
    expect(typeof common).toBe('object');

    // Check that all expected properties exist
    const expectedProps = [
      'orderStatus',
      'TOP_PRODUCTS_PER_PAGE',
      'PRODUCT_PER_PAGE',
      'BLOG_PER_PAGE',
      'TOP_TRENDING',
      'TOP_SELLING',
      'VISIBLE_PRODUCT',
      'COLOR_PER_PAGE',
      'SIZE_PER_PAGE',
      'CATEGORY_PER_PAGE',
      'TIME_OUT_ADD_TO_CART',
      'DESCREASE',
      'INCREASE',
      'PAYMENT_METHOD',
      'MESSAGE_PER_PAGE',
    ];

    expectedProps.forEach((prop) => {
      expect(common).toHaveProperty(prop);
    });
  });

  test('orderStatus should contain all expected statuses', () => {
    expect(Array.isArray(common.orderStatus)).toBe(true);
    expect(common.orderStatus).toHaveLength(9);

    // Check specific entries
    expect(common.orderStatus).toContainEqual({
      value: 'all',
      label: 'All Orders',
    });
    expect(common.orderStatus).toContainEqual({ value: 'NEW', label: 'New' });
    expect(common.orderStatus).toContainEqual({
      value: 'PROCESSING',
      label: 'Processing',
    });
    expect(common.orderStatus).toContainEqual({
      value: 'DELIVERED',
      label: 'Delivered',
    });
    expect(common.orderStatus).toContainEqual({
      value: 'CANCELLED',
      label: 'Cancelled',
    });

    // Check structure of each entry
    common.orderStatus.forEach((status) => {
      expect(status).toHaveProperty('value');
      expect(status).toHaveProperty('label');
      expect(typeof status.value).toBe('string');
      expect(typeof status.label).toBe('string');
    });
  });

  test('pagination constants should have correct values', () => {
    expect(common.TOP_PRODUCTS_PER_PAGE).toBe(100);
    expect(common.PRODUCT_PER_PAGE).toBe(18);
    expect(common.BLOG_PER_PAGE).toBe(10);
    expect(common.VISIBLE_PRODUCT).toBe(18);
    expect(common.COLOR_PER_PAGE).toBe(100);
    expect(common.SIZE_PER_PAGE).toBe(10);
    expect(common.CATEGORY_PER_PAGE).toBe(10);
    expect(common.MESSAGE_PER_PAGE).toBe(100);
  });

  test('string constants should have correct values', () => {
    expect(common.TOP_TRENDING).toBe('TOP TRENDING');
    expect(common.TOP_SELLING).toBe('TOP SELLING');
    expect(common.DESCREASE).toBe('decrease');
    expect(common.INCREASE).toBe('increase');
  });

  test('TIME_OUT_ADD_TO_CART should be a number', () => {
    expect(typeof common.TIME_OUT_ADD_TO_CART).toBe('number');
    expect(common.TIME_OUT_ADD_TO_CART).toBe(2000);
  });

  test('PAYMENT_METHOD should contain all expected payment methods', () => {
    expect(Array.isArray(common.PAYMENT_METHOD)).toBe(true);
    expect(common.PAYMENT_METHOD).toHaveLength(2);

    // Check specific entries
    expect(common.PAYMENT_METHOD).toContainEqual({ id: 'COD', label: 'COD' });
    expect(common.PAYMENT_METHOD).toContainEqual({
      id: 'VN_PAY',
      label: 'Vn Pay',
    });

    // Check structure of each entry
    common.PAYMENT_METHOD.forEach((method) => {
      expect(method).toHaveProperty('id');
      expect(method).toHaveProperty('label');
      expect(typeof method.id).toBe('string');
      expect(typeof method.label).toBe('string');
    });
  });

  test('should match snapshot', () => {
    expect(common).toMatchSnapshot();
  });
});
