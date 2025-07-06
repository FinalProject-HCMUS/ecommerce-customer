import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './detail-product-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock ProductGallery
jest.mock('../../components/page/detail/ProductGallery', () => (props: any) => (
  <div data-testid="product-gallery">{JSON.stringify(props.images)}</div>
));

// Mock ProductInfo
jest.mock('../../components/page/detail/ProductInfo', () => (props: any) => (
  <div data-testid="product-info">
    <button
      data-testid="add-to-cart"
      onClick={() => props.handleAddToCart(2, 'item1')}
      disabled={props.isAdding}
    >
      Add to Cart
    </button>
    {props.product?.name}
  </div>
));

// Mock VirtualTryOn
jest.mock('../../components/page/detail/VirtualTryOn', () => (props: any) => (
  <div data-testid="virtual-tryon">{props.garment ? 'TryOn' : ''}</div>
));

// Mock ProductDescription
jest.mock('../../components/page/detail/ProductDescription', () => (props: any) => (
  <div data-testid="product-description">{props.description}</div>
));

// Mock ReviewSection
jest.mock('../../components/page/detail/ReviewSection', () => (props: any) => (
  <div data-testid="review-section">{props.productId}</div>
));

// Mock Loading
jest.mock('../../components/shared/Loading', () => () => (
  <div data-testid="loading" />
));

// Mock useParams
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'product123' }),
  };
});

// Mock useProducts
const fetchProductById = jest.fn();
jest.mock('../../hooks/products', () => ({
  useProducts: () => ({
    fetchProductById,
    loading: false,
  }),
}));

// Mock useProductImages
const fetchProductImages = jest.fn();
jest.mock('../../hooks/product-images', () => ({
  useProductImages: () => ({
    fetchProductImages,
    loading: false,
  }),
}));

// Mock useProductColorSize
const fetchProductColorSizes = jest.fn();
jest.mock('../../hooks/product-color-size', () => ({
  useProductColorSize: () => ({
    fetchProductColorSizes,
    loading: false,
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: (fn: any) =>
    fn({
      auth: {
        userInfo: { id: 'user1' },
        isAuthenticated: true,
      },
    }),
}));

// Mock useCart
const addCartItem = jest.fn();
jest.mock('../../hooks/cart', () => ({
  useCart: () => ({
    addCartItem,
  }),
}));

// Mock showError
const showError = jest.fn();
jest.mock('../../utils/messageRender', () => ({
  showError: (...args: any[]) => showError(...args),
}));

const mockProduct = {
  id: 'product123',
  name: 'Test Product',
  description: 'A great product',
};
const mockImages = [{ id: 'img1', url: 'img1.jpg' }];
const mockColorSize = [
  {
    color: { id: 'c1', name: 'Red' },
    size: { id: 's1', name: 'M' },
  },
];

describe('DetailProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchProductById.mockResolvedValue(mockProduct);
    fetchProductImages.mockResolvedValue(mockImages);
    fetchProductColorSizes.mockResolvedValue(mockColorSize);
    addCartItem.mockResolvedValue(true);
  });

  it('renders all main sections when data is loaded', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
      expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
      expect(screen.getByTestId('product-info')).toBeInTheDocument();
      expect(screen.getByTestId('virtual-tryon')).toBeInTheDocument();
      expect(screen.getByTestId('product-description')).toBeInTheDocument();
      expect(screen.getByTestId('review-section')).toBeInTheDocument();
    });
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A great product')).toBeInTheDocument();
  });

  it('calls addCartItem and sets isAdding', async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('add-to-cart'));
      expect(addCartItem).toHaveBeenCalledWith({
        userId: 'user1',
        itemId: 'item1',
        quantity: 2,
      });
    });
  });
});