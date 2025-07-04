import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderSummary from './OrderSummary';
import { OrderSummaryData } from '../../../interfaces';
import * as settingContext from '../../../context/settingContext';
import * as stringHelper from '../../../helpers/string';
import { SystemSettingResponse } from '../../../interfaces/config/setting';

// Mock dependencies
jest.mock('../../../helpers/i18n', () => ({
  t: jest.fn((key) => key),
}));

jest.mock('../../../helpers/string', () => ({
  formatCurrency: jest.fn((value, currency) => 
    currency === 'USD' ? `$${value}` : `${value} ₫`
  ),
}));

jest.mock('../../../context/settingContext', () => ({
  useSettingsContext: jest.fn(),
}));

describe('OrderSummary', () => {
  const mockOrderData: OrderSummaryData = {
    subtotal: 200000,
    deliveryFee: 20000,
    total: 220000,
  };


    const mockSettings : SystemSettingResponse[]= [
    { 
      id: '1', 
      key: 'CurrencyCode', 
      value: 'VND' as unknown as object, 
      serviceName: 'MySetting'  // Changed from 'group' to 'serviceName'
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    jest.spyOn(settingContext, 'useSettingsContext').mockReturnValue({
      settings: mockSettings,
      loading: false,
      error: null,
      refreshSettings: jest.fn(),
    });
  });

  test('renders with required props and VND currency', () => {
    render(<OrderSummary data={mockOrderData} />);
    
    // Check headings and labels
    expect(screen.getByText('lbl.orderSummary')).toBeInTheDocument();
    expect(screen.getByText('lbl.subTotal')).toBeInTheDocument();
    expect(screen.getByText('lbl.deliveryFee')).toBeInTheDocument();
    expect(screen.getByText('lbl.total')).toBeInTheDocument();
    
    // Check formatted currency values
    expect(stringHelper.formatCurrency).toHaveBeenCalledWith(200000, 'VND');
    expect(stringHelper.formatCurrency).toHaveBeenCalledWith(20000, 'VND');
    expect(stringHelper.formatCurrency).toHaveBeenCalledWith(220000, 'VND');
    
    // Check button is enabled by default
    const checkoutButton = screen.getByText('lbl.gotoCheckout').closest('button');
    expect(checkoutButton).not.toBeDisabled();
  });

  test('does not render item counts when not provided', () => {
    render(<OrderSummary data={mockOrderData} />);
    
    // Should not find the selected items text
    expect(screen.queryByText('lbl.selectedItems:')).not.toBeInTheDocument();
  });

  test('handles checkout button click', () => {
    const handleCheckout = jest.fn();
    render(<OrderSummary data={mockOrderData} onCheckout={handleCheckout} />);
    
    // Click the checkout button
    const checkoutButton = screen.getByText('lbl.gotoCheckout').closest('button');
    fireEvent.click(checkoutButton!);
    
    // Check if the callback was called
    expect(handleCheckout).toHaveBeenCalledTimes(1);
  });

  test('disables checkout button when isCheckoutEnabled is false', () => {
    render(<OrderSummary data={mockOrderData} isCheckoutEnabled={false} />);
    
    // Check if the button is disabled
    const checkoutButton = screen.getByText('lbl.gotoCheckout').closest('button');
    expect(checkoutButton).toBeDisabled();
    expect(checkoutButton).toHaveStyle('opacity: 0.5');
    expect(checkoutButton).toHaveStyle('cursor: not-allowed');
  });

  test('uses default VND currency when currency setting is not found', () => {
    jest.spyOn(settingContext, 'useSettingsContext').mockReturnValue({
      settings: [], // Empty settings, no currency code
      loading: false,
      error: null,
      refreshSettings: jest.fn(),
    });
    
    render(<OrderSummary data={mockOrderData} />);
    
    // Should default to VND
    expect(stringHelper.formatCurrency).toHaveBeenCalledWith(200000, 'VND');
  });

  test('matches snapshot', () => {
    const { container } = render(<OrderSummary data={mockOrderData} />);
    expect(container).toMatchSnapshot();
  });
});