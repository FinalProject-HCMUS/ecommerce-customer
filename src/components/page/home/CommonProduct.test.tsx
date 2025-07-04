import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CommonProduct from './CommonProduct';
import { ProductResponse } from '../../../interfaces/product/ProductResponse';

// Mock the constants - important to set VISIBLE_PRODUCT for testing
jest.mock('../../../constants', () => ({
  common: {
    VISIBLE_PRODUCT: 2  // Set to 2 for easier testing of pagination
  }
}));

// Mock the ProductCard component
jest.mock('../../shared/product-card/ProductCard', () => {
  return {
    __esModule: true,
    default: ({ product }: { product: ProductResponse }) => (
      <div data-testid={`product-card-${product.id}`}>
        <div className="product-name">{product.name}</div>
        <div className="product-price">{product.price}</div>
      </div>
    ),
  };
});

// Mock the translation function
jest.mock('../../../helpers/i18n', () => ({
  t: jest.fn((key) => key),
}));

describe('CommonProduct', () => {
  // Mock product data
  const mockProducts: ProductResponse[] = [
    {
      id: '1',
      name: 'Test Product 1',
      description: 'Test description 1',
      cost: 80000,
      total: 100,
      price: 100000,
      discountPercent: 10,
      enable: true,
      inStock: true,
      mainImageUrl: '/test-image1.jpg',
      averageRating: 4.5,
      reviewCount: 12,
      categoryId: 'category-1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      id: '2',
      name: 'Test Product 2',
      description: 'Test description 2',
      cost: 90000,
      total: 50,
      price: 120000,
      discountPercent: 5,
      enable: true,
      inStock: true,
      mainImageUrl: '/test-image2.jpg',
      averageRating: 4.0,
      reviewCount: 8,
      categoryId: 'category-1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      id: '3',
      name: 'Test Product 3',
      description: 'Test description 3',
      cost: 100000,
      total: 75,
      price: 150000,
      discountPercent: 15,
      enable: true,
      inStock: true,
      mainImageUrl: '/test-image3.jpg',
      averageRating: 5.0,
      reviewCount: 20,
      categoryId: 'category-2',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      id: '4',
      name: 'Test Product 4',
      description: 'Test description 4',
      cost: 110000,
      total: 85,
      price: 160000,
      discountPercent: 20,
      enable: true,
      inStock: true,
      mainImageUrl: '/test-image4.jpg',
      averageRating: 4.2,
      reviewCount: 15,
      categoryId: 'category-2',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      createdBy: 'admin',
      updatedBy: 'admin',
    },
  ];

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders the component with title', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts} />);
    
    // Check if the title is rendered
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
  });

  test('initially renders only VISIBLE_PRODUCT number of products', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts} />);
    
    // Should render only first 2 products initially (VISIBLE_PRODUCT = 2)
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card-4')).not.toBeInTheDocument();
  });

  test('shows "See More" button when there are more products to show', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts} />);
    
    // See More button should be visible since we have 4 products and VISIBLE_PRODUCT = 2
    expect(screen.getByText('btn.seeMore')).toBeInTheDocument();
  });

  test('clicking "See More" loads more products', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts} />);
    
    // Initially should not see product 3 and 4
    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card-4')).not.toBeInTheDocument();
    
    // Click See More button
    fireEvent.click(screen.getByText('btn.seeMore'));
    
    // Now should see all 4 products
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-4')).toBeInTheDocument();
    
    // Should now show "See Less" button
    expect(screen.getByText('btn.seeLess')).toBeInTheDocument();
  });

  test('clicking "See Less" reduces the number of products shown', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts} />);
    
    // Click See More to show all products
    fireEvent.click(screen.getByText('btn.seeMore'));
    
    // Verify all products are shown
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-4')).toBeInTheDocument();
    
    // Click See Less
    fireEvent.click(screen.getByText('btn.seeLess'));
    
    // Should go back to showing only 2 products
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card-4')).not.toBeInTheDocument();
  });

  test('does not show "See More" button when all products can be shown initially', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts.slice(0, 2)} />);
    
    // See More button should not be visible since we only have 2 products and VISIBLE_PRODUCT = 2
    expect(screen.queryByText('btn.seeMore')).not.toBeInTheDocument();
  });

  test('renders empty grid when no products are provided', () => {
    renderWithRouter(<CommonProduct title="Featured Products" data={[]} />);
    
    // Should render the section but with no product cards
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.queryByTestId(/product-card-/)).not.toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = renderWithRouter(<CommonProduct title="Featured Products" data={mockProducts} />);
    expect(container).toMatchSnapshot();
  });
});