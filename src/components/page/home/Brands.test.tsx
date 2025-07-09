import { render, screen } from '@testing-library/react';
import Brands from './Brands';

jest.mock('../../../data/brands', () => ({
  brands: [
    { name: 'Versace', logo: 'VERSACE' },
    { name: 'Zara', logo: 'ZARA' },
    { name: 'Gucci', logo: 'GUCCI' },
    { name: 'Prada', logo: 'PRADA' },
    { name: 'Calvin Klein', logo: 'Calvin Klein' },
  ],
}));

describe('Brands', () => {
  it('renders all brand logos', () => {
    render(<Brands />);
    expect(screen.getByText('VERSACE')).toBeInTheDocument();
    expect(screen.getByText('ZARA')).toBeInTheDocument();
    expect(screen.getByText('GUCCI')).toBeInTheDocument();
    expect(screen.getByText('PRADA')).toBeInTheDocument();
    expect(screen.getByText('Calvin Klein')).toBeInTheDocument();
  });

  it('renders correct number of brand logo elements', () => {
    render(<Brands />);
    expect(
      screen.getAllByText(/VERSACE|ZARA|GUCCI|PRADA|Calvin Klein/)
    ).toHaveLength(5);
  });
});
