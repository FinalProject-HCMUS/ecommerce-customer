import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';
import { MemoryRouter } from 'react-router-dom';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', path: '/' },
    { label: 'Category', path: '/category' },
    { label: 'Product', path: '/category/product' },
  ];

  it('renders all breadcrumb items as links', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>
    );
    items.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.label).closest('a')).toHaveAttribute('href', item.path);
    });
  });

  it('renders separators between items except after the last', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>
    );
    // There should be two separators for three items
    expect(screen.getAllByText('>')).toHaveLength(2);
  });

  it('renders nothing if items is empty', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[]} />
      </MemoryRouter>
    );
    // Should not render any links or separators
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });
});