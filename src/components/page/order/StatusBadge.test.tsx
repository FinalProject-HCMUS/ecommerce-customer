import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';
import { Status } from '../../../interfaces/order/Status';

// Mock statusConfig
jest.mock('../../../data/statusConfig', () => ({
  statusConfig: {
    NEW: {
      bgColor: 'bg-blue-100',
      color: 'text-blue-800',
      borderColor: 'border-blue-300',
      icon: <span data-testid="icon">🆕</span>,
      text: 'New',
    },
    DELIVERED: {
      bgColor: 'bg-green-100',
      color: 'text-green-800',
      borderColor: 'border-green-300',
      icon: <span data-testid="icon">✅</span>,
      text: 'Delivered',
    },
    CANCELLED: {
      bgColor: 'bg-red-100',
      color: 'text-red-800',
      borderColor: 'border-red-300',
      icon: <span data-testid="icon">❌</span>,
      text: 'Cancelled',
    },
  },
}));

describe('StatusBadge', () => {
  it('renders correct style and text for NEW', () => {
    render(<StatusBadge status={Status.NEW} />);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('🆕');
    const badge = screen.getByText('New').closest('span');
    expect(badge).toHaveClass('bg-blue-100');
    expect(badge).toHaveClass('text-blue-800');
    expect(badge).toHaveClass('border-blue-300');
  });

  it('renders correct style and text for DELIVERED', () => {
    render(<StatusBadge status={Status.DELIVERED} />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('✅');
    const badge = screen.getByText('Delivered').closest('span');
    expect(badge).toHaveClass('bg-green-100');
    expect(badge).toHaveClass('text-green-800');
    expect(badge).toHaveClass('border-green-300');
  });

  it('renders correct style and text for CANCELLED', () => {
    render(<StatusBadge status={Status.CANCELLED} />);
    expect(screen.getByText('Cancelled')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('❌');
    const badge = screen.getByText('Cancelled').closest('span');
    expect(badge).toHaveClass('bg-red-100');
    expect(badge).toHaveClass('text-red-800');
    expect(badge).toHaveClass('border-red-300');
  });
});
