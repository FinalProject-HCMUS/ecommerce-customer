import { render, screen, fireEvent } from '@testing-library/react';
import ProductGallery from './ProductGallery';

const mockImages = [
  { id: '1', url: 'https://example.com/img1.jpg', productId: 'p1', createdAt: '', createdBy: '', updatedAt: '', updatedBy: '' },
  { id: '2', url: 'https://example.com/img2.jpg', productId: 'p1', createdAt: '', createdBy: '', updatedAt: '', updatedBy: '' },
];

describe('ProductGallery', () => {
  it('renders all thumbnails', () => {
    render(<ProductGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    // 2 thumbnails + 1 main image
    expect(thumbnails.length).toBe(3);
    expect(thumbnails[0]).toHaveAttribute('src', mockImages[0].url);
    expect(thumbnails[1]).toHaveAttribute('src', mockImages[1].url);
  });

  it('shows the first image as main image by default', () => {
    render(<ProductGallery images={mockImages} />);
    const mainImage = screen.getAllByRole('img')[2];
    expect(mainImage).toHaveAttribute('src', mockImages[0].url);
  });

  it('changes main image when a thumbnail is clicked', () => {
    render(<ProductGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[1]); // Click second thumbnail
    const mainImage = screen.getAllByRole('img')[2];
    expect(mainImage).toHaveAttribute('src', mockImages[1].url);
  });

  it('applies selected style to the selected thumbnail', () => {
    render(<ProductGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    // First thumbnail should have selected style
    expect(thumbnails[0].className).toMatch(/border-2/);
    // Click second thumbnail
    fireEvent.click(thumbnails[1]);
    // Now second thumbnail should have selected style
    expect(thumbnails[1].className).toMatch(/border-2/);
  });
});