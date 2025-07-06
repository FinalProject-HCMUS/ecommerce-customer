import { render, screen } from '@testing-library/react';
import Hero from './Hero';

// Mock t and tUpperCase
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
  tUpperCase: (key: string) => key.toUpperCase(),
}));

// Mock shopData
jest.mock('../../../locales/en/shopData.json', () => ({
  hero: {
    title: 'Welcome to Fashion',
    description: 'Discover the latest trends.',
    image: 'https://example.com/hero.jpg',
    characteristics: [
      { title: 'Quality', description: 'Best materials.' },
      { title: 'Style', description: 'Modern designs.' },
      { title: 'Comfort', description: 'Wear all day.' },
      { title: 'Affordable', description: 'Great prices.' },
    ],
  },
}), { virtual: true });

// Mock image import
jest.mock('../../../assets/images/hero/hero.png', () => 'mock-hero-img', { virtual: true });

// Mock Link from react-router-dom
jest.mock('react-router-dom', () => ({
  Link: (props: any) => <a {...props} />,
}));

describe('Hero', () => {
  it('renders hero title, description, and shop now button', () => {
    render(<Hero />);
    expect(screen.getByText('HERO.TITLE')).toBeInTheDocument();
    expect(screen.getByText('hero.description')).toBeInTheDocument();
    expect(screen.getByText('btn.shopNow')).toBeInTheDocument();
  });

  it('renders all characteristics in rows of 3', () => {
    render(<Hero />);
    // There are 4 characteristics, so 2 rows (first row: 3, second row: 1)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(screen.getByText('hero.characteristics.0.title')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.1.title')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.2.title')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.3.title')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.0.description')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.1.description')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.2.description')).toBeInTheDocument();
    expect(screen.getByText('hero.characteristics.3.description')).toBeInTheDocument();
  });

  it('renders hero image', () => {
    render(<Hero />);
    const img = screen.getByAltText('Fashion models');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/hero.jpg');
  });
});