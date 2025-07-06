import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuickAddDialog from '../product-card/QuickAddDialog';

// Mock child components and hooks
jest.mock('../../page/detail/ColorSelector', () => (props: any) => (
  <div data-testid="color-selector" onClick={() => props.onChange('color1')}>ColorSelector</div>
));
jest.mock('../../page/detail/SizeSelector', () => (props: any) => (
  <div data-testid="size-selector" onClick={() => props.onChange('size1')}>SizeSelector</div>
));
jest.mock('../QuantityControl', () => (props: any) => (
  <div>
    <button onClick={props.onDecrement} aria-label="Decrease quantity">-</button>
    <span>{props.quantity}</span>
    <button onClick={props.onIncrement} aria-label="Increase quantity">+</button>
  </div>
));
jest.mock('../AddToCartButton', () => (props: any) => (
  <button onClick={props.onClick} disabled={props.isAdding} data-testid="add-to-cart-btn">
    {props.isAdding ? 'Adding...' : 'Add to cart'}
  </button>
));
jest.mock('../../../hooks/product-color-size', () => ({
  useProductColorSize: () => ({
    fetchProductColorSizes: jest.fn().mockResolvedValue([
      {
        id: 'pcs1',
        quantity: 5,
        color: { id: 'color1', name: 'Red', code: '#f00', createdAt: '', createdBy: '', updatedAt: '', updatedBy: '' },
        size: { id: 'size1', name: 'M', minHeight: 160, maxHeight: 170, minWeight: 50, maxWeight: 60, createdAt: '', createdBy: '', updatedAt: '', updatedBy: '' },
        product: { id: 'p1' },
        createdAt: '', createdBy: '', updatedAt: '', updatedBy: ''
      }
    ]),
  }),
}));
jest.mock('../../../hooks/cart', () => ({
  useCart: () => ({
    addCartItem: jest.fn().mockResolvedValue({}),
  }),
}));
jest.mock('../../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'CurrencyCode', value: 'USD' }],
  }),
}));
jest.mock('../../../utils/messageRender', () => ({
  showError: jest.fn(),
}));

// Mock t function to just return the key for easier assertions
jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) =>
    selector({
      auth: {
        userInfo: { id: 'user1' },
        isAuthenticated: true,
      },
    }),
}));

const product = {
  id: 'p1',
  name: 'Test Product',
  description: 'desc',
  cost: 100,
  total: 10,
  price: 120,
  discountPercent: 0,
  enable: true,
  inStock: true,
  mainImageUrl: 'img.png',
  averageRating: 4.5,
  reviewCount: 2,
  categoryId: 'cat1',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-02',
  createdBy: 'admin',
  updatedBy: 'admin',
};

describe('QuickAddDialog', () => {
  it('renders loading state', () => {
    render(<QuickAddDialog product={product} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('renders product info after loading', async () => {
    render(<QuickAddDialog product={product} isOpen={true} onClose={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$120')).toBeInTheDocument();
      expect(screen.getByTestId('color-selector')).toBeInTheDocument();
      expect(screen.getByTestId('size-selector')).toBeInTheDocument();
      expect(screen.getByTestId('add-to-cart-btn')).toBeInTheDocument();
    });
  });

  it('increments and decrements quantity', async () => {
    render(<QuickAddDialog product={product} isOpen={true} onClose={() => {}} />);
    await waitFor(() => screen.getByText('Test Product'));
    const increment = screen.getByLabelText('Increase quantity');
    const decrement = screen.getByLabelText('Decrease quantity');
    fireEvent.click(increment);
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(decrement);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls addCartItem when AddToCartButton is clicked', async () => {
    render(<QuickAddDialog product={product} isOpen={true} onClose={() => {}} />);
    await waitFor(() => screen.getByText('Test Product'));
    // Select color and size
    fireEvent.click(screen.getByTestId('color-selector'));
    fireEvent.click(screen.getByTestId('size-selector'));
    // Add to cart
    fireEvent.click(screen.getByTestId('add-to-cart-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('add-to-cart-btn')).toBeDisabled();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<QuickAddDialog product={product} isOpen={true} onClose={onClose} />);
    await waitFor(() => screen.getByText('Test Product'));
    fireEvent.click(screen.getByRole('button', { name: '' })); // The close (X) button
    expect(onClose).toHaveBeenCalled();
  });
});