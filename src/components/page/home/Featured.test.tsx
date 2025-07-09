import { render, screen } from '@testing-library/react';
import Featured from './Featured';

// Mock t and tUpperCase
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
  tUpperCase: (key: string) => key.toUpperCase(),
}));

// Mock shopData
jest.mock(
  '../../../locales/en/shopData.json',
  () => ({
    about: {
      title: 'About Us',
      description: 'About description',
      image: 'https://example.com/about.jpg',
    },
  }),
  { virtual: true }
);

// Mock image import
jest.mock('../../../assets/images/about/about.png', () => 'mock-about-img', {
  virtual: true,
});

// Mock Link from react-router-dom
jest.mock('react-router-dom', () => ({
  Link: (props: any) => <a {...props} />,
}));

describe('Featured', () => {
  it('renders about title, description, and see collection button', () => {
    render(<Featured />);
    expect(screen.getByText('ABOUT.TITLE')).toBeInTheDocument();
    expect(screen.getByText('about.description')).toBeInTheDocument();
    expect(screen.getByText('btn.seeCollection')).toBeInTheDocument();
  });

  it('renders about image', () => {
    render(<Featured />);
    const img = screen.getByAltText('Fashion models');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/about.jpg');
  });
});
