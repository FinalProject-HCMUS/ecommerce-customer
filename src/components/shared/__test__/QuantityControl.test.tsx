import { render, screen, fireEvent } from '@testing-library/react';
import QuantityControl from '../QuantityControl';

describe('QuantityControl', () => {
  it('renders quantity and buttons', () => {
    render(
      <QuantityControl
        quantity={5}
        onIncrement={() => {}}
        onDecrement={() => {}}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
  });

  it('calls onIncrement when increase button is clicked', () => {
    const onIncrement = jest.fn();
    render(
      <QuantityControl
        quantity={2}
        onIncrement={onIncrement}
        onDecrement={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(onIncrement).toHaveBeenCalled();
  });

  it('calls onDecrement when decrease button is clicked', () => {
    const onDecrement = jest.fn();
    render(
      <QuantityControl
        quantity={2}
        onIncrement={() => {}}
        onDecrement={onDecrement}
      />
    );
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(onDecrement).toHaveBeenCalled();
  });
});
