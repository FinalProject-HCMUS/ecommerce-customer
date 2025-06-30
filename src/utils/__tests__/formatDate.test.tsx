import { formatDate, formatTime } from '../formatDate';
import * as localization from '../../helpers/localization';

jest.mock('../../helpers/localization', () => ({
  getCurrentLanguage: jest.fn(),
}));

jest.mock('../../constants/localization', () => ({
  REGIONS: {
    vi: { key: 'vi' },
    en: { key: 'en' },
  },
  VN: 'vi-VN',
  EN: 'en-US',
}));

describe('formatDate', () => {
  const testDate = '2023-05-15T10:30:00';
  
  it('should format date in Vietnamese format when language is Vietnamese', () => {
    jest.spyOn(localization, 'getCurrentLanguage').mockReturnValue('vi');
    const result = formatDate(testDate);
    expect(result).toContain('2023');
    expect(result).not.toBe('');
  });

  it('should format date in English format when language is English', () => {
    jest.spyOn(localization, 'getCurrentLanguage').mockReturnValue('en');
    const result = formatDate(testDate);
    expect(result).toContain('2023');
    expect(result).not.toBe('');
  });

});

describe('formatTime', () => {
  it('should format time to hours and minutes', () => {
    const testDateTime = '2023-05-15T14:30:00';
    const result = formatTime(testDateTime);
    expect(result).toMatch(/\d{1,2}[:.]\d{2}/);
  });

  it('should handle time at midnight', () => {
    const testDateTime = '2023-05-15T00:00:00';
    const result = formatTime(testDateTime);
    expect(result).not.toBe('');
  });

  it('should handle invalid time strings', () => {
    const invalidTime = 'not-a-time';
    expect(() => formatTime(invalidTime)).not.toThrow();
  });
});