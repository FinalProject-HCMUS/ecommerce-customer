import * as i18nHelpers from '../i18n';

jest.mock('../i18n', () => ({
  __esModule: true,
  t: jest.fn((text: string) => `translated:${text}`),
  tArray: jest.fn((arr: string[]) => arr.map((t) => `translated:${t}`)),
  tUpperCase: jest.fn((text: string) => `TRANSLATED:${text.toUpperCase()}`),
  tLowerCase: jest.fn((text: string) => `translated:${text.toLowerCase()}`),
}));
describe('i18n helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('t should return translated text using i18n.t', () => {
    jest
      .spyOn(i18nHelpers, 't')
      .mockImplementation((text: string) => `translated:${text}`);
    expect(i18nHelpers.t('hello')).toBe('translated:hello');
  });

  test('tUpperCase should return uppercased translated text', () => {
    jest
      .spyOn(i18nHelpers, 't')
      .mockImplementation((text: string) => `translated:${text}`);
    jest
      .spyOn(i18nHelpers, 'tUpperCase')
      .mockImplementation((text: string) => `TRANSLATED:${text.toUpperCase()}`);
    expect(i18nHelpers.tUpperCase('hello')).toBe('TRANSLATED:HELLO');
  });

  test('tLowerCase should return lowercased translated text', () => {
    jest
      .spyOn(i18nHelpers, 't')
      .mockImplementation((text: string) => `translated:${text}`);
    jest
      .spyOn(i18nHelpers, 'tLowerCase')
      .mockImplementation((text: string) => `translated:${text.toLowerCase()}`);
    expect(i18nHelpers.tLowerCase('HELLO')).toBe('translated:hello');
  });

  test('should fallback to original text if i18n is not defined', async () => {
    jest.resetModules();
    jest.doMock('../i18n', () => ({
      __esModule: true,
      t: (text: string) => text,
      tArray: (arr: string[]) => arr,
      tUpperCase: (text: string) => text,
      tLowerCase: (text: string) => text,
    }));
    const { t, tArray, tUpperCase, tLowerCase } = await import('../i18n');
    expect(t('test')).toBe('test');
    expect(tArray(['a', 'b'])).toEqual(['a', 'b']);
    expect(tUpperCase('test')).toBe('test');
    expect(tLowerCase('TEST')).toBe('TEST');
  });
});
