import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CartItem from './CartItem';
import { CartItemResponse } from '../../../interfaces';

// Mock dependencies
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('CartItem', () => {
  // Mock props with complete interface matching
  const mockItem: CartItemResponse = {
    id: 'cart-item-1',
    quantity: 2,
    product: {
      id: 'product-1',
      name: 'Test Product',
      description: 'Test description',
      cost: 80000,
      total: 200000,
      price: 100000,
      discountPercent: 10,
      enable: true,
      inStock: true,
      mainImageUrl: '/test-image.jpg',
      averageRating: 4.5,
      reviewCount: 12,
      categoryId: 'category-1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    color: '#FF0000',
    size: 'M',
    userId: 'user-1',
    itemId: 'item-1',
  };

  const mockProps = {
    item: mockItem,
    updateQuantity: jest.fn(),
    removeItem: jest.fn(),
    isSelected: false,
    onSelect: jest.fn(),
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('matches snapshot', () => {
    const { container } = renderWithRouter(<CartItem {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  test('renders the cart item with correct information', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    // Check product information is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('lbl.size: M')).toBeInTheDocument();
    expect(screen.getByText('lbl.color:')).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    // Check quantity is displayed
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('handles checkbox selection', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(mockProps.onSelect).toHaveBeenCalledWith('cart-item-1', true);
  });

  test('shows checked state when isSelected is true', () => {
    renderWithRouter(<CartItem {...{ ...mockProps, isSelected: true }} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('handles remove button click', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    const removeButton = screen.getByTestId('remove-item-cart-item-1');
    fireEvent.click(removeButton);

    expect(mockProps.removeItem).toHaveBeenCalledWith('cart-item-1');
  });

  test('handles quantity decrease', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    const decreaseButton = screen.getByText('−');
    fireEvent.click(decreaseButton);

    expect(mockProps.updateQuantity).toHaveBeenCalledWith('cart-item-1', 1);
  });

  test('handles quantity increase', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    expect(mockProps.updateQuantity).toHaveBeenCalledWith('cart-item-1', 3);
  });

  test('renders product link with correct URL', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    const productLink = screen.getByText('Test Product');
    expect(productLink.closest('a')).toHaveAttribute(
      'href',
      '/product/product-1'
    );
  });

  test('renders with accessibility attributes', () => {
    renderWithRouter(<CartItem {...mockProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute(
      'aria-label',
      'Select Test Product for checkout'
    );
  });
});
