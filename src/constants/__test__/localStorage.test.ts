import localStorageConstants from '../localStorage';

describe('localStorage constants', () => {
  test('should export an object with all expected keys', () => {
    expect(localStorageConstants).toBeDefined();
    expect(typeof localStorageConstants).toBe('object');
    const expectedKeys = [
      'LOCALIZATION',
      'TOKEN',
      'REFRESH_TOKEN',
      'EMAIL',
      'USER_INFO',
    ];
    expectedKeys.forEach((key) => {
      expect(localStorageConstants).toHaveProperty(key);
    });
  });

  test('should have correct values for each key', () => {
    expect(localStorageConstants.LOCALIZATION).toBe('localization');
    expect(localStorageConstants.TOKEN).toBe('token');
    expect(localStorageConstants.REFRESH_TOKEN).toBe('refresh_token');
    expect(localStorageConstants.EMAIL).toBe('email');
    expect(localStorageConstants.USER_INFO).toBe('user_info');
  });

  test('should match snapshot', () => {
    expect(localStorageConstants).toMatchSnapshot();
  });
});
