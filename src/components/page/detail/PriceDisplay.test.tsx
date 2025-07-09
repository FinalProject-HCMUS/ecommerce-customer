import { render, screen } from '@testing-library/react';
import PriceDisplay from './PriceDisplay';

// Mock formatCurrency
jest.mock('../../../helpers/string', () => ({
  formatCurrency: (value: number, currency: string) => `${value}-${currency}`,
}));

// Mock useSettingsContext
jest.mock('../../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'CurrencyCode', value: 'USD' }],
  }),
}));

describe('PriceDisplay', () => {
  it('renders current price with correct currency', () => {
    render(
      <PriceDisplay currentPrice={100} originalPrice={120} discountPercentage={20} />
    );
    expect(screen.getByText('100-USD')).toBeInTheDocument();
  });

  it('renders original price and discount when discountPercentage is not 0', () => {
    render(
      <PriceDisplay currentPrice={80} originalPrice={100} discountPercentage={20} />
    );
    expect(screen.getByText('100-USD')).toBeInTheDocument();
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('does not render original price and discount when discountPercentage is 0', () => {
    render(
      <PriceDisplay currentPrice={100} originalPrice={100} discountPercentage={0} />
    );
    expect(screen.queryByText('100-USD')).toBeInTheDocument();
    // Should only find one occurrence of price (the current price)
    expect(screen.queryAllByText('100-USD').length).toBe(1);
    expect(screen.queryByText('-0%')).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    render(
      <PriceDisplay currentPrice={100} originalPrice={120} discountPercentage={10} size="lg" />
    );
    const current = screen.getByText('100-USD');
    expect(current.className).toMatch(/text-2xl/);
    const original = screen.getByText('120-USD');
    expect(original.className).toMatch(/text-xl/);
    const discount = screen.getByText('-10%');
    expect(discount.className).toMatch(/text-sm/);
  });
});