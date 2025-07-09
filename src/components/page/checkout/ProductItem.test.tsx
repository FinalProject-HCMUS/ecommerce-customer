import { render, screen } from '@testing-library/react';
import { ProductItem } from './ProductItem';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  size: 'L',
  color: 'Red',
  price: 150,
  quantity: 3,
  image: 'https://example.com/product.jpg',
};

describe('ProductItem', () => {
  it('renders product image, name, size, color, price, and quantity', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByAltText('Test Product')).toHaveAttribute(
      'src',
      mockProduct.image
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Size: L')).toBeInTheDocument();
    expect(screen.getByText('Color: Red')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText('x3')).toBeInTheDocument();
  });
});
