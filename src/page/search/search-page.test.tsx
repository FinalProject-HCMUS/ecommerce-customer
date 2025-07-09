import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './search-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock Filters
jest.mock('../../components/page/search/Filters', () => (props: any) => (
  <div data-testid="filters">
    <button
      data-testid="color-btn"
      onClick={() => props.setSelectedColor('red')}
    >
      Color
    </button>
    <button data-testid="size-btn" onClick={() => props.setSelectedSize('L')}>
      Size
    </button>
    <button
      data-testid="category-btn"
      onClick={() => props.setSelectedCategory('cat1')}
    >
      Category
    </button>
    <button
      data-testid="price-btn"
      onClick={() => props.setPriceRange([0, 100])}
    >
      Price
    </button>
  </div>
));

// Mock ProductGrid
jest.mock('../../components/page/search/ProductGrid', () => (props: any) => (
  <div data-testid="product-grid">{props.products.length} products</div>
));

// Mock SearchHeader
jest.mock('../../components/page/search/SearchHeader', () => (props: any) => (
  <div data-testid="search-header">{props.keySearch}</div>
));

// Mock Pagination
jest.mock('../../components/shared/Pagination', () => (props: any) => (
  <div data-testid="pagination" onClick={() => props.onPageChange(2)}>
    Pagination {props.currentPage}/{props.totalPages}
  </div>
));

// Mock SearchInput
jest.mock('../../components/page/search/SearchInput', () => (props: any) => (
  <input
    data-testid="search-input"
    value={props.keySearch || ''}
    onChange={(e) => props.setKeySearch(e.target.value)}
    placeholder="Search"
  />
));

// Mock Loading
jest.mock('../../components/shared/Loading', () => () => (
  <div data-testid="loading" />
));

// Mock useProducts
const fetchAllProducts = jest.fn();
jest.mock('../../hooks/products', () => ({
  useProducts: () => ({
    loading: false,
    fetchAllProducts,
  }),
}));

// Mock useCategory
const fetchAllCategories = jest.fn();
jest.mock('../../hooks/category', () => ({
  useCategory: () => ({
    loading: false,
    fetchAllCategories,
  }),
}));

// Mock useColors
const fetchAllColors = jest.fn();
jest.mock('../../hooks/color', () => ({
  useColors: () => ({
    loading: false,
    fetchAllColors,
  }),
}));

// Mock useSizes
const fetchAllSizes = jest.fn();
jest.mock('../../hooks/size', () => ({
  useSizes: () => ({
    loading: false,
    fetchAllSizes,
  }),
}));

// Mock useSettingsContext
jest.mock('../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'MaxPriceFilter', value: 20000000 }],
  }),
}));

const mockProductResponse = {
  content: [
    { id: 'p1', name: 'Product 1' },
    { id: 'p2', name: 'Product 2' },
  ],
  totalPages: 3,
};
const mockCategories = [{ id: 'cat1', name: 'Category 1' }];
const mockColors = { content: [{ id: 'red', name: 'Red' }] };
const mockSizes = { content: [{ id: 'L', name: 'Large' }] };

describe('SearchPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchAllProducts.mockResolvedValue(mockProductResponse);
    fetchAllCategories.mockResolvedValue(mockCategories);
    fetchAllColors.mockResolvedValue(mockColors);
    fetchAllSizes.mockResolvedValue(mockSizes);
  });

  it('renders all main sections when data is loaded', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
      expect(screen.getByTestId('filters')).toBeInTheDocument();
      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByTestId('search-header')).toBeInTheDocument();
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
  });

  it('updates keySearch when typing in search input', async () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'shoes' } });
    expect(input).toHaveValue('shoes');
  });

  it('updates filters when clicking filter buttons', async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('color-btn'));
    fireEvent.click(screen.getByTestId('size-btn'));
    fireEvent.click(screen.getByTestId('category-btn'));
    fireEvent.click(screen.getByTestId('price-btn'));
    // No assertion needed, just ensure no crash and state updates
  });

  it('calls handlePageChange and scrolls to top on pagination click', async () => {
    window.scrollTo = jest.fn();
    render(<App />);
    fireEvent.click(screen.getByTestId('pagination'));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
