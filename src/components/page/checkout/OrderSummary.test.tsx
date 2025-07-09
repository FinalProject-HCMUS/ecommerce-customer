import { render, screen, fireEvent } from '@testing-library/react';
import { OrderSummary } from './OrderSummary';
import { CartItemResponse } from '../../../interfaces';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock formatCurrency
jest.mock('../../../helpers/string', () => ({
  formatCurrency: (value: number, currency: string) => `${value}-${currency}`,
}));

// Mock GeneralButton to just render children and call onClick
jest.mock('../../shared/Button', () => ({
  GeneralButton: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

// Mock useSettingsContext
jest.mock('../../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'CurrencyCode', value: 'USD' }],
  }),
}));

const mockItems: CartItemResponse[] = [
  {
    id: '1',
    quantity: 2,
    product: {
      id: 'p1',
      name: 'Product 1',
      description: 'A product',
      cost: 80,
      total: 10,
      price: 100,
      discountPercent: 10,
      enable: true,
      inStock: true,
      mainImageUrl: 'https://example.com/img.jpg',
      averageRating: 4.5,
      reviewCount: 10,
      categoryId: 'cat1',
      createdAt: '2024-07-01T00:00:00Z',
      updatedAt: '2024-07-01T00:00:00Z',
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    color: '#ff0000',
    size: 'M',
    userId: 'u1',
    itemId: 'i1',
  },
];

const mockSummary = {
  subtotal: 180,
  deliveryFee: 20,
  total: 200,
};

describe('OrderSummary', () => {
  it('renders order summary title and items', () => {
    render(
      <OrderSummary
        items={mockItems}
        summary={mockSummary}
        handlePayment={jest.fn()}
      />
    );
    expect(screen.getByText('lbl.orderSummary')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByAltText('Product 1')).toHaveAttribute(
      'src',
      mockItems[0].product.mainImageUrl
    );
    expect(screen.getByText('lbl.quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('lbl.color:')).toBeInTheDocument();
    expect(screen.getByText('lbl.size: M')).toBeInTheDocument();
  });

  it('calls handlePayment when button is clicked', () => {
    const handlePayment = jest.fn();
    render(
      <OrderSummary
        items={mockItems}
        summary={mockSummary}
        handlePayment={handlePayment}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'lbl.makePayment' }));
    expect(handlePayment).toHaveBeenCalled();
  });
});
