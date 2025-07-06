import { render, screen } from '@testing-library/react';
import ProductImage from '../product-card/ProductImage';
import { MemoryRouter } from 'react-router-dom';

describe('ProductImage', () => {
  it('renders image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <ProductImage id="123" imageUrl="test.jpg" />
      </MemoryRouter>
    );
    const img = screen.getByAltText('Product Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('renders link to product detail page', () => {
    render(
      <MemoryRouter>
        <ProductImage id="abc" imageUrl="img.png" />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/abc');
  });

  it('applies correct classes', () => {
    render(
      <MemoryRouter>
        <ProductImage id="1" imageUrl="img.png" />
      </MemoryRouter>
    );
    const img = screen.getByAltText('Product Image');
    expect(img.className).toMatch(/object-cover/);
    expect(img.className).toMatch(/transition-transform/);
  });
});