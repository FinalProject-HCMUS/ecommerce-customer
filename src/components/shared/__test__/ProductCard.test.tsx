import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../product-card/ProductCard';
import { MemoryRouter } from 'react-router-dom';

// Mock child components and hooks
jest.mock('../product-card/ProductImage', () => ({ id, imageUrl }: any) => (
  <div data-testid="product-image" data-id={id} data-url={imageUrl} />
));
jest.mock('../QuantityControl', () => ({ quantity, onIncrement, onDecrement }: any) => (
  <div>
    <button onClick={onDecrement} data-testid="decrement">-</button>
    <span data-testid="quantity">{quantity}</span>
    <button onClick={onIncrement} data-testid="increment">+</button>
  </div>
));
jest.mock('../AddToCartButton', () => ({ isAdding, onClick }: any) => (
  <button onClick={onClick} data-testid="add-to-cart">{isAdding ? 'Adding...' : 'Add to cart'}</button>
));
jest.mock('../RatingStars', () => ({ rating }: any) => (
  <div data-testid="rating-stars">{rating}</div>
));
jest.mock('../product-card/QuickAddDialog', () => ({ isOpen, onClose }: any) =>
  isOpen ? <div data-testid="quick-add-dialog"><button onClick={onClose}>Close</button></div> : null
);
jest.mock('../../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'CurrencyCode', value: 'USD' }],
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

describe('ProductCard', () => {
  it('renders product info and image', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toHaveAttribute('data-id', 'p1');
    expect(screen.getByTestId('product-image')).toHaveAttribute('data-url', 'img.png');
    expect(screen.getByTestId('rating-stars')).toHaveTextContent('4.5');
    expect(screen.getByText('$120')).toBeInTheDocument();
  });

  it('increments and decrements quantity', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    const increment = screen.getByTestId('increment');
    const decrement = screen.getByTestId('decrement');
    const quantity = screen.getByTestId('quantity');

    expect(quantity).toHaveTextContent('1');
    fireEvent.click(increment);
    expect(quantity).toHaveTextContent('2');
    fireEvent.click(decrement);
    expect(quantity).toHaveTextContent('1');
    fireEvent.click(decrement);
    expect(quantity).toHaveTextContent('1'); // Should not go below 1
  });

  it('opens QuickAddDialog when AddToCartButton is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('quick-add-dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-to-cart'));
    expect(screen.getByTestId('quick-add-dialog')).toBeInTheDocument();
  });

  it('closes QuickAddDialog when onClose is called', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('add-to-cart'));
    expect(screen.getByTestId('quick-add-dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('quick-add-dialog')).not.toBeInTheDocument();
  });
});