import { render, screen, fireEvent } from '@testing-library/react';
import { CheckoutForm } from './CheckoutForm';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock PAYMENT_METHOD
jest.mock('../../../constants', () => ({
  common: {
    PAYMENT_METHOD: [
      { id: 'cod', label: 'Cash on Delivery' },
      { id: 'bank', label: 'Bank Transfer' },
    ],
  },
}));

const defaultFormData = {
  name: 'John Doe',
  phone: '0123456789',
  address: '123 Main St',
  paymentMethod: 'cod',
};

describe('CheckoutForm', () => {
  it('renders all input fields and payment methods', () => {
    render(
      <CheckoutForm
        formData={defaultFormData}
        onInputChange={jest.fn()}
        onPaymentMethodChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText('lbl.receiverName')).toBeInTheDocument();
    expect(screen.getByLabelText('lbl.receiverPhone')).toBeInTheDocument();
    expect(screen.getByLabelText('lbl.receiverAddress')).toBeInTheDocument();
    expect(screen.getByLabelText('Cash on Delivery')).toBeInTheDocument();
    expect(screen.getByLabelText('Bank Transfer')).toBeInTheDocument();
  });

  it('calls onInputChange when typing in input fields', () => {
    const onInputChange = jest.fn();
    render(
      <CheckoutForm
        formData={defaultFormData}
        onInputChange={onInputChange}
        onPaymentMethodChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText('lbl.receiverName'), {
      target: { value: 'Jane' },
    });
    expect(onInputChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('lbl.receiverPhone'), {
      target: { value: '0987654321' },
    });
    expect(onInputChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('lbl.receiverAddress'), {
      target: { value: '456 Another St' },
    });
    expect(onInputChange).toHaveBeenCalled();
  });

  it('calls onPaymentMethodChange when selecting a payment method', () => {
    const onPaymentMethodChange = jest.fn();
    render(
      <CheckoutForm
        formData={defaultFormData}
        onInputChange={jest.fn()}
        onPaymentMethodChange={onPaymentMethodChange}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Bank Transfer'));
    expect(onPaymentMethodChange).toHaveBeenCalledWith('bank');
  });
});
