import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './cart-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock CartItem
jest.mock('../../components/page/cart/CartItem', () => (props: any) => (
  <div data-testid={`cart-item-${props.item.id}`}>
    <button onClick={() => props.updateQuantity(props.item.id, props.item.quantity + 1)}>
      Increase
    </button>
    <button onClick={() => props.removeItem(props.item.id)}>Remove</button>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={e => props.onSelect(props.item.id, e.target.checked)}
      data-testid={`select-${props.item.id}`}
    />
    {props.item.product.name}
  </div>
));

// Mock OrderSummary
jest.mock('../../components/page/cart/OrderSummary', () => (props: any) => (
  <div data-testid="order-summary">
    <button
      onClick={props.onCheckout}
      disabled={!props.isCheckoutEnabled}
      data-testid="checkout-btn"
    >
      Checkout
    </button>
    <span data-testid="subtotal">{props.data.subtotal}</span>
    <span data-testid="deliveryFee">{props.data.deliveryFee}</span>
    <span data-testid="total">{props.data.total}</span>
  </div>
));

// Mock Loading
jest.mock('../../components/shared/Loading', () => () => (
  <div data-testid="loading" />
));

// Mock useCart
const fetchCartItemsByUserId = jest.fn();
const removeCartItem = jest.fn();
const modifyCartItem = jest.fn();
jest.mock('../../hooks/cart', () => ({
  useCart: () => ({
    loading: false,
    fetchCartItemsByUserId,
    removeCartItem,
    modifyCartItem,
  }),
}));

// Mock useSelector
jest.mock('react-redux', () => ({
  useSelector: (fn: any) => fn({ auth: { userInfo: { id: 'user1' } } }),
}));

// Mock useNavigate
const navigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

// Mock useSettingsContext
jest.mock('../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'ShippingPrice', value: 20 }],
  }),
}));

// Mock showError and showSuccess
const showError = jest.fn();
const showSuccess = jest.fn();
jest.mock('../../utils/messageRender', () => ({
  showError: (...args: any[]) => showError(...args),
  showSuccess: (...args: any[]) => showSuccess(...args),
}));

const mockCartItems = [
  {
    id: 'item1',
    quantity: 2,
    product: { id: 'p1', name: 'Product 1', price: 100, discountPercent: 0 },
  },
  {
    id: 'item2',
    quantity: 1,
    product: { id: 'p2', name: 'Product 2', price: 200, discountPercent: 10 },
  },
];

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchCartItemsByUserId.mockResolvedValue(mockCartItems);
    removeCartItem.mockResolvedValue(true);
    modifyCartItem.mockResolvedValue(true);
  });

  it('renders empty cart message', async () => {
    fetchCartItemsByUserId.mockResolvedValueOnce([]);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('lbl.emptyCart')).toBeInTheDocument();
      expect(screen.getByText('lbl.addItemsToCart')).toBeInTheDocument();
    });
  });

  it('renders cart items and order summary', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('cart-item-item1')).toBeInTheDocument();
      expect(screen.getByTestId('cart-item-item2')).toBeInTheDocument();
      expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    });
  });

  it('selects and deselects items', async () => {
    render(<App />);
    await waitFor(() => {
      const checkbox = screen.getByTestId('select-item1');
      fireEvent.click(checkbox);
      // After click, checkbox should be unchecked (toggle)
      expect(checkbox).not.toBeChecked();
    });
  });

  it('updates quantity and shows success', async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Increase')[0]);
      expect(modifyCartItem).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalledWith('success.cartUpdated');
    });
  });

  it('removes item and shows success', async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Remove')[0]);
      expect(removeCartItem).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalledWith('success.itemRemoved');
    });
  });

  it('handles checkout and navigates with selected items', async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('checkout-btn'));
      expect(navigate).toHaveBeenCalledWith('/checkout', expect.objectContaining({
        state: expect.objectContaining({
          selectedCartItems: expect.any(Array),
          orderSummary: expect.any(Object),
        }),
      }));
    });
  });

  it('shows error on invalid quantity', async () => {
    modifyCartItem.mockResolvedValueOnce(false);
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Increase')[0]);
      expect(showError).toHaveBeenCalled();
    });
  });
});