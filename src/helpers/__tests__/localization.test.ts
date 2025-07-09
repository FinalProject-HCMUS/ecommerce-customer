import * as localization from '../localization';

jest.mock('../../constants/localStorage', () => ({
  // Remove the "default" nesting level
  LOCALIZATION: 'LOCALIZATION',
}));

jest.mock('../../constants/localization', () => ({
  // Remove the "default" nesting level
  REGIONS: { vi: { key: 'vi' }, en: { key: 'en' } },
}));

const LOCALIZATION_KEY = 'LOCALIZATION';

describe('localization helpers', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    localStorage.clear();
    window.location = { reload: jest.fn() } as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });

  describe('getCurrentLanguage', () => {
    it('returns the language from localStorage if set', () => {
      localStorage.setItem(LOCALIZATION_KEY, 'en');
      expect(localization.getCurrentLanguage()).toBe('en');
    });

    it('returns default language if not set', () => {
      expect(localization.getCurrentLanguage()).toBe('vi');
    });
  });

  describe('changeLanguage', () => {
    it('sets the language and reloads if different', () => {
      localStorage.setItem(LOCALIZATION_KEY, 'vi');
      localization.changeLanguage('en');
      expect(localStorage.getItem(LOCALIZATION_KEY)).toBe('en');
      expect(window.location.reload).toHaveBeenCalled();
    });

    it('does nothing if language is the same', () => {
      localStorage.setItem(LOCALIZATION_KEY, 'vi');
      localization.changeLanguage('vi');
      expect(localStorage.getItem(LOCALIZATION_KEY)).toBe('vi');
      expect(window.location.reload).not.toHaveBeenCalled();
    });
  });
});
