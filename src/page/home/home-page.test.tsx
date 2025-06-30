import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './home-page';
import { useProducts } from '../../hooks/products';
import { common } from '../../constants';
import { BrowserRouter } from 'react-router-dom';

const { TOP_SELLING, TOP_TRENDING } = common;

jest.mock('../../constants', () => ({
  common: {
    TOP_SELLING: 'TOP_SELLING',
    TOP_TRENDING: 'TOP_TRENDING',
    TOP_PRODUCTS_PER_PAGE: 100
  }
}));

// Mock the hooks
jest.mock('../../hooks/products', () => ({
  useProducts: jest.fn(),
}));

// Mock the components
jest.mock('../../components/page/home/Hero', () => () => <div data-testid="hero-component">Hero Component</div>);
jest.mock('../../components/page/home/Brands', () => () => <div data-testid="brands-component">Brands Component</div>);
jest.mock('../../components/page/home/Featured', () => () => <div data-testid="featured-component">Featured Component</div>);
jest.mock('../../components/page/home/Contact', () => () => <div data-testid="contact-component">Contact Component</div>);
jest.mock('../../components/page/home/CommonProduct', () => (
  { title, data }: { title: string; data: any[] }
) => (
  <div data-testid={`common-product-${title}`}>
    <div data-testid={`common-product-title-${title}`}>{title}</div>
    <div data-testid={`common-product-count-${title}`}>{data.length}</div>
  </div>
));

// Mock the translation function
interface I18nMock {
    t: (key: string) => string;
}

jest.mock('../../helpers/i18n', (): I18nMock => ({
    t: (key: string) => key,
}));

describe('HomePage Component', () => {
  const mockTopSellingProducts = [
    { id: '1', name: 'Product 1', price: 100, mainImageUrl: 'image1.jpg', discountPercent: 10, averageRating: 4.5, reviewCount: 10 },
    { id: '2', name: 'Product 2', price: 200, mainImageUrl: 'image2.jpg', discountPercent: 20, averageRating: 4.0, reviewCount: 20 },
  ];

  const mockTopTrendingProducts = [
    { id: '3', name: 'Product 3', price: 300, mainImageUrl: 'image3.jpg', discountPercent: 30, averageRating: 3.5, reviewCount: 30 },
    { id: '4', name: 'Product 4', price: 400, mainImageUrl: 'image4.jpg', discountPercent: 0, averageRating: 5.0, reviewCount: 40 },
  ];

  const mockFetchTopProducts = jest.fn().mockResolvedValue({
    topProducts: [
      { title: TOP_SELLING, data: mockTopSellingProducts },
      { title: TOP_TRENDING, data: mockTopTrendingProducts },
    ],
  });

  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
      fetchTopProducts: mockFetchTopProducts,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    (useProducts as jest.Mock).mockReturnValue({
      fetchTopProducts: mockFetchTopProducts,
      loading: true,
    });

    render(<HomePage />, { wrapper: BrowserRouter });
    
    expect(screen.getByText('shopName')).toBeDefined();
  });

  it('should render all components when data is loaded', async () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    
    await waitFor(() => {
      expect(screen.getByTestId('hero-component')).toBeDefined();
      expect(screen.getByTestId('brands-component')).toBeDefined();
      expect(screen.getByTestId('featured-component')).toBeDefined();
      expect(screen.getByTestId('contact-component')).toBeDefined();
      
      expect(screen.getByTestId(`common-product-lbl.topSelling`)).toBeDefined();
      expect(screen.getByTestId(`common-product-lbl.topTrending`)).toBeDefined();
    });
    
    expect(mockFetchTopProducts).toHaveBeenCalledTimes(1);
  });
  
  it('should pass the correct data to CommonProducts components', async () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    
    await waitFor(() => {
      // Check that top selling products data is passed correctly
      expect(screen.getByTestId(`common-product-count-lbl.topSelling`).textContent).toBe('2');
      
      // Check that top trending products data is passed correctly  
      expect(screen.getByTestId(`common-product-count-lbl.topTrending`).textContent).toBe('2');
    });
  });

  it('should handle case when no products are returned', async () => {
    (useProducts as jest.Mock).mockReturnValue({
      fetchTopProducts: jest.fn().mockResolvedValue({
        topProducts: []
      }),
      loading: false,
    });

    render(<HomePage />, { wrapper: BrowserRouter });
    
    await waitFor(() => {
      expect(screen.getByTestId('hero-component')).toBeDefined();
      
      // Should still render the CommonProducts but with empty arrays
      expect(screen.getByTestId(`common-product-count-lbl.topSelling`).textContent).toBe('0');
      expect(screen.getByTestId(`common-product-count-lbl.topTrending`).textContent).toBe('0');
    });
  });
});