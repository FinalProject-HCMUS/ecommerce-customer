import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from './EmptyState';

// Mock lucide-react icon
jest.mock('lucide-react', () => ({
  Package: (props: any) => <svg data-testid="package-icon" {...props} />,
}));

describe('EmptyState', () => {
  it('renders message for no orders when searchTerm is empty', () => {
    render(<EmptyState searchTerm="" />);
    expect(screen.getByText('No orders found')).toBeInTheDocument();
    expect(
      screen.getByText("You haven't placed any orders yet.")
    ).toBeInTheDocument();
    expect(screen.queryByText('Clear Search')).not.toBeInTheDocument();
    expect(screen.getByTestId('package-icon')).toBeInTheDocument();
  });

  it('renders search message and Clear Search button when searchTerm is present', () => {
    render(<EmptyState searchTerm="shoes" onClearSearch={jest.fn()} />);
    expect(screen.getByText('No orders found')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try adjusting your search or filter to find what you're looking for."
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Clear Search')).toBeInTheDocument();
  });

  it('calls onClearSearch when Clear Search button is clicked', () => {
    const onClearSearch = jest.fn();
    render(<EmptyState searchTerm="shoes" onClearSearch={onClearSearch} />);
    fireEvent.click(screen.getByText('Clear Search'));
    expect(onClearSearch).toHaveBeenCalled();
  });

  it('does not render Clear Search button if onClearSearch is not provided', () => {
    render(<EmptyState searchTerm="shoes" />);
    expect(screen.queryByText('Clear Search')).not.toBeInTheDocument();
  });
});
