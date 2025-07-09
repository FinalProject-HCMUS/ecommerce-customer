import { render, screen, fireEvent } from '@testing-library/react';
import AddToCartButton from '../AddToCartButton';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('AddToCartButton', () => {
  it('renders "Add to cart" when not adding', () => {
    render(<AddToCartButton isAdding={false} onClick={() => {}} />);
    expect(screen.getByText('btn.addToCart')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('renders "Added to cart" and disables button when adding', () => {
    render(<AddToCartButton isAdding={true} onClick={() => {}} />);
    expect(screen.getByText('btn.addedToCart')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked and not adding', () => {
    const handleClick = jest.fn();
    render(<AddToCartButton isAdding={false} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<AddToCartButton isAdding={true} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies correct class for adding and not adding', () => {
    const { rerender } = render(<AddToCartButton isAdding={false} onClick={() => {}} />);
    expect(screen.getByRole('button').className).toMatch(/bg-gray-800/);

    rerender(<AddToCartButton isAdding={true} onClick={() => {}} />);
    expect(screen.getByRole('button').className).toMatch(/bg-green-500/);
  });
});