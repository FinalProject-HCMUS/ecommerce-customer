import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock ProductCard
jest.mock('../../shared/product-card/ProductCard', () => (props: any) => (
  <div data-testid="product-card">{props.product.name}</div>
));

// Mock framer-motion to render children directly
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
}));

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: '',
    cost: 0,
    total: 0,
    price: 100,
    discountPercent: 0,
    enable: true,
    inStock: true,
    mainImageUrl: '',
    averageRating: 4,
    reviewCount: 10,
    categoryId: 'cat1',
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    updatedBy: '',
  },
  {
    id: '2',
    name: 'Product 2',
    description: '',
    cost: 0,
    total: 0,
    price: 200,
    discountPercent: 0,
    enable: true,
    inStock: true,
    mainImageUrl: '',
    averageRating: 5,
    reviewCount: 5,
    categoryId: 'cat2',
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    updatedBy: '',
  },
];

describe('ProductGrid', () => {
  it('renders no product found message when products is empty', () => {
    render(<ProductGrid products={[]} />);
    expect(screen.getByText('lbl.noProductFound')).toBeInTheDocument();
  });

  it('renders no product found message when products is undefined', () => {
    render(<ProductGrid products={undefined as any} />);
    expect(screen.getByText('lbl.noProductFound')).toBeInTheDocument();
  });

  it('renders a ProductCard for each product', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
