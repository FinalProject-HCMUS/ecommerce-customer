import { render, screen } from '@testing-library/react';
import OrderConfirmation from './order-confirmation';
import * as ReactRouterDom from 'react-router-dom';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock formatCurrency and formatDate
jest.mock('../../helpers/string', () => ({
  formatCurrency: (value: number, code: string) => `${value} ${code}`,
}));
jest.mock('../../utils/formatDate', () => ({
  formatDate: (date: string) => `formatted-${date}`,
}));

// Mock useSettingsContext
jest.mock('../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'CurrencyCode', value: 'VND' }],
  }),
}));

// Mock CheckCircleIcon
jest.mock('lucide-react', () => ({
  CheckCircleIcon: (props: any) => (
    <svg data-testid="check-circle" {...props} />
  ),
}));

// Mock Link and navigation
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
    Link: (props: any) => <a {...props} />,
  };
});

const mockOrder = {
  id: 'order123',
  createdAt: '2024-07-06T12:00:00Z',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '0123456789',
  paymentMethod: 'COD',
  subTotal: 100,
  shippingCost: 20,
  total: 120,
  status: 'CONFIRMED',
};

describe('OrderConfirmation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders order confirmation details', () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(ReactRouterDom, 'useLocation')
      .mockReturnValue({ state: { order: mockOrder } } as any);
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

    render(<OrderConfirmation />);

    expect(screen.getByText('checkout.orderConfirmed')).toBeInTheDocument();
    expect(
      screen.getByText('checkout.orderConfirmationEmail')
    ).toBeInTheDocument();
    expect(screen.getByText('checkout.orderSummary')).toBeInTheDocument();
    expect(screen.getByText(mockOrder.id)).toBeInTheDocument();
    expect(
      screen.getByText(`formatted-${mockOrder.createdAt}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockOrder.firstName} ${mockOrder.lastName}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockOrder.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockOrder.paymentMethod)).toBeInTheDocument();
    expect(screen.getByText(`100 VND`)).toBeInTheDocument();
    expect(screen.getByText(`20 VND`)).toBeInTheDocument();
    expect(screen.getByText(`120 VND`)).toBeInTheDocument();
    expect(screen.getByText('checkout.orderStatus')).toBeInTheDocument();
    expect(screen.getByText(mockOrder.status)).toBeInTheDocument();
    expect(
      screen.getByText('checkout.trackingInstructions')
    ).toBeInTheDocument();
    expect(screen.getByText('checkout.continueShopping')).toBeInTheDocument();
    expect(screen.getByText('checkout.viewOrders')).toBeInTheDocument();
    expect(screen.getAllByTestId('check-circle').length).toBeGreaterThan(0);
  });

  it('redirects to home if no order data', () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(ReactRouterDom, 'useLocation')
      .mockReturnValue({ state: undefined } as any);
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

    render(<OrderConfirmation />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('returns null if no order', () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(ReactRouterDom, 'useLocation')
      .mockReturnValue({ state: undefined } as any);
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

    const { container } = render(<OrderConfirmation />);
    expect(container.firstChild).toBeNull();
  });
});
