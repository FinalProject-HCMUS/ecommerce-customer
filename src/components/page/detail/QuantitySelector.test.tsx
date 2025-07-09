import { render, screen, fireEvent } from '@testing-library/react';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
  it('renders the quantity value', () => {
    render(
      <QuantitySelector
        quantity={5}
        onIncrease={jest.fn()}
        onDecrease={jest.fn()}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onIncrease when the increase button is clicked', () => {
    const onIncrease = jest.fn();
    render(
      <QuantitySelector
        quantity={2}
        onIncrease={onIncrease}
        onDecrease={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(onIncrease).toHaveBeenCalled();
  });

  it('calls onDecrease when the decrease button is clicked', () => {
    const onDecrease = jest.fn();
    render(
      <QuantitySelector
        quantity={2}
        onIncrease={jest.fn()}
        onDecrease={onDecrease}
      />
    );
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(onDecrease).toHaveBeenCalled();
  });
});
