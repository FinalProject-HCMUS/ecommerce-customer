import { render, screen } from '@testing-library/react';
import ErrorRender from '../ErrorRender';
import { MemoryRouter } from 'react-router-dom';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('ErrorRender', () => {
  it('renders error title, text, and back to home link', () => {
    render(
      <MemoryRouter>
        <ErrorRender title="notFound" text="notFoundText" />
      </MemoryRouter>
    );
    expect(screen.getByText('error.notFound')).toBeInTheDocument();
    expect(screen.getByText('error.notFoundText')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'btn.backToHome' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});