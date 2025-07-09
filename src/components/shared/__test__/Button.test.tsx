import { render, screen, fireEvent } from '@testing-library/react';
import { GeneralButton, BackToHomeButton, LogoutButton } from '../Button';
import { MemoryRouter } from 'react-router-dom';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('GeneralButton', () => {
  it('renders children', () => {
    render(<GeneralButton>Click me</GeneralButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(
      <GeneralButton variant="secondary" size="lg">
        Test
      </GeneralButton>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/bg-gray-200/);
    expect(btn.className).toMatch(/px-5/);
  });

  it('applies custom className', () => {
    render(<GeneralButton className="custom-class">Test</GeneralButton>);
    expect(screen.getByRole('button').className).toMatch(/custom-class/);
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<GeneralButton onClick={handleClick}>Click</GeneralButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disabled or isLoading', () => {
    const { rerender } = render(<GeneralButton disabled>Test</GeneralButton>);
    expect(screen.getByRole('button')).toBeDisabled();

    rerender(<GeneralButton isLoading>Test</GeneralButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner when isLoading', () => {
    render(<GeneralButton isLoading>Loading</GeneralButton>);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
});

describe('BackToHomeButton', () => {
  it('renders a link to home with correct text and icon', () => {
    render(
      <MemoryRouter>
        <BackToHomeButton />
      </MemoryRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(screen.getByText('btn.backToHome')).toBeInTheDocument();
  });
});

describe('LogoutButton', () => {
  it('renders a button with logout text and icon', () => {
    render(<LogoutButton />);
    expect(screen.getByText('btn.logOut')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
