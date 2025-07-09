import { render, screen, fireEvent } from '@testing-library/react';
import ProductInfo from './ProductInfo';

// Mock child components and t function
jest.mock('../../shared/RatingStars', () => () => (
  <div data-testid="rating-stars" />
));
jest.mock('./PriceDisplay', () => () => <div data-testid="price-display" />);
jest.mock('./ColorSelector', () => (props: any) => (
  <button data-testid="color-selector" onClick={() => props.onChange('color2')}>
    ColorSelector
  </button>
));
jest.mock('./SizeSelector', () => (props: any) => (
  <button data-testid="size-selector" onClick={() => props.onChange('size2')}>
    SizeSelector
  </button>
));
jest.mock('../../shared/AddToCartButton', () => (props: any) => (
  <button
    data-testid="add-to-cart"
    onClick={props.onClick}
    disabled={props.isAdding}
  >
    {props.isAdding ? 'Adding...' : 'Add to Cart'}
  </button>
));
jest.mock('../../shared/QuantityControl', () => (props: any) => (
  <div>
    <button data-testid="decrement" onClick={props.onDecrement}>
      -
    </button>
    <span data-testid="quantity">{props.quantity}</span>
    <button data-testid="increment" onClick={props.onIncrement}>
      +
    </button>
  </div>
));
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

const mockProduct = {
  id: 'p1',
  name: 'Test Product',
  description: 'desc',
  cost: 100,
  total: 5,
  price: 200,
  discountPercent: 10,
  enable: true,
  inStock: true,
  mainImageUrl: '',
  averageRating: 4.5,
  reviewCount: 10,
  categoryId: 'cat1',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  updatedBy: '',
};

const mockColors = [
  {
    id: 'color1',
    name: 'Red',
    code: '#ff0000',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: 'color2',
    name: 'Blue',
    code: '#0000ff',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];

const mockSizes = [
  {
    id: 'size1',
    name: 'M',
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: 'size2',
    name: 'L',
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];

const mockProductColorSize = [
  {
    id: 'pcs1',
    quantity: 3,
    product: mockProduct,
    color: mockColors[0],
    size: mockSizes[0],
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: 'pcs2',
    quantity: 2,
    product: mockProduct,
    color: mockColors[1],
    size: mockSizes[1],
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];

describe('ProductInfo', () => {
  it('renders product name, rating, price, selectors, and stock info', () => {
    render(
      <ProductInfo
        product={mockProduct}
        colors={mockColors}
        productColorSize={mockProductColorSize}
        sizes={mockSizes}
        handleAddToCart={jest.fn()}
        isAdding={false}
      />
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toBeInTheDocument();
    expect(screen.getByTestId('price-display')).toBeInTheDocument();
    expect(screen.getByTestId('color-selector')).toBeInTheDocument();
    expect(screen.getByTestId('size-selector')).toBeInTheDocument();
    expect(screen.getByText('lbl.quantity: 5')).toBeInTheDocument();
    expect(screen.getByText('lbl.inStock')).toBeInTheDocument();
  });

  it('updates quantityAvailable and itemId when color and size are selected', () => {
    render(
      <ProductInfo
        product={mockProduct}
        colors={mockColors}
        productColorSize={mockProductColorSize}
        sizes={mockSizes}
        handleAddToCart={jest.fn()}
        isAdding={false}
      />
    );
    // Select color2 and size2 (triggers matchingProduct = pcs2, quantity = 2)
    fireEvent.click(screen.getByTestId('color-selector'));
    fireEvent.click(screen.getByTestId('size-selector'));
    expect(screen.getByText('lbl.quantity: 2')).toBeInTheDocument();
  });

  it('handles quantity increment and decrement', () => {
    render(
      <ProductInfo
        product={mockProduct}
        colors={mockColors}
        productColorSize={mockProductColorSize}
        sizes={mockSizes}
        handleAddToCart={jest.fn()}
        isAdding={false}
      />
    );
    const increment = screen.getByTestId('increment');
    const decrement = screen.getByTestId('decrement');
    const quantity = screen.getByTestId('quantity');
    expect(quantity.textContent).toBe('1');
    fireEvent.click(increment);
    expect(quantity.textContent).toBe('2');
    fireEvent.click(decrement);
    expect(quantity.textContent).toBe('1');
    fireEvent.click(decrement);
    expect(quantity.textContent).toBe('1'); // Should not go below 1
  });

  it('calls handleAddToCart with correct quantity and itemId', () => {
    const handleAddToCart = jest.fn();
    render(
      <ProductInfo
        product={mockProduct}
        colors={mockColors}
        productColorSize={mockProductColorSize}
        sizes={mockSizes}
        handleAddToCart={handleAddToCart}
        isAdding={false}
      />
    );
    // Select color2 and size2 (itemId = pcs2)
    fireEvent.click(screen.getByTestId('color-selector'));
    fireEvent.click(screen.getByTestId('size-selector'));
    fireEvent.click(screen.getByTestId('add-to-cart'));
    expect(handleAddToCart).toHaveBeenCalledWith(1, 'pcs2');
  });

  it('shows out of stock when no matching color/size', () => {
    render(
      <ProductInfo
        product={mockProduct}
        colors={mockColors}
        productColorSize={[]}
        sizes={mockSizes}
        handleAddToCart={jest.fn()}
        isAdding={false}
      />
    );
    // Select color2 and size2 (no matchingProduct)
    fireEvent.click(screen.getByTestId('color-selector'));
    fireEvent.click(screen.getByTestId('size-selector'));
    expect(screen.getByText('lbl.quantity: 0')).toBeInTheDocument();
    expect(screen.getByText('lbl.outOfStock')).toBeInTheDocument();
  });

  it('disables AddToCartButton when isAdding is true', () => {
    render(
      <ProductInfo
        product={mockProduct}
        colors={mockColors}
        productColorSize={mockProductColorSize}
        sizes={mockSizes}
        handleAddToCart={jest.fn()}
        isAdding={true}
      />
    );
    expect(screen.getByTestId('add-to-cart')).toBeDisabled();
  });
});
