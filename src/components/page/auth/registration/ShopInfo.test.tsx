import { render, screen } from '@testing-library/react';
import ShopInfo from './ShopInfo';

// Mock i18n helper and shopData
jest.mock('../../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));
jest.mock('../../../../locales/en/shopData.json', () => ({
  register: {
    benefit: [{}, {}, {}], // mock 3 benefits
  },
}));

describe('ShopInfo', () => {
  it('renders shop name and description', () => {
    render(<ShopInfo />);
    expect(screen.getByText('register.shopName')).toBeInTheDocument();
    expect(screen.getByText('register.description')).toBeInTheDocument();
  });

  it('renders all benefits', () => {
    render(<ShopInfo />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('register.benefit.0.value')).toBeInTheDocument();
    expect(screen.getByText('register.benefit.1.value')).toBeInTheDocument();
    expect(screen.getByText('register.benefit.2.value')).toBeInTheDocument();
  });
});
