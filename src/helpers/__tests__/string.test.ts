import { formatCurrency } from '../string';

describe('formatCurrency', () => {
  it('formats number as USD currency', () => {
    expect(formatCurrency(1234, 'USD')).toBe('$1,234');
    expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000');
  });

  it('formats number as VND currency', () => {
    expect(formatCurrency(1234, 'VND')).toBe('₫1,234');
    expect(formatCurrency(1000000, 'VND')).toBe('₫1,000,000');
  });
});