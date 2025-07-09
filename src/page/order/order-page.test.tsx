import { render, screen, fireEvent } from '@testing-library/react';
import OrdersPage from './order-page';

// Mock t function
jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock icons
jest.mock('lucide-react', () => ({
  Search: () => <svg data-testid="search-icon" />,
  Filter: () => <svg data-testid="filter-icon" />,
  ChevronDown: () => <svg data-testid="chevron-icon" />,
  X: () => <svg data-testid="x-icon" />,
}));

// Mock EmptyState
jest.mock('../../components/page/order/EmptyState', () => (props: any) => (
  <div data-testid="empty-state">
    <button data-testid="clear-search" onClick={props.onClearSearch}>
      Clear
    </button>
    {props.searchTerm}
  </div>
));

// Mock LoadingSkeleton
jest.mock('../../components/page/order/LoadingSkeleton', () => (props: any) => (
  <div data-testid="loading-skeleton">{props.count}</div>
));

// Mock StatusBadge
jest.mock('../../components/page/order/StatusBadge', () => (props: any) => (
  <span data-testid="status-badge">{props.status}</span>
));

// Mock OrderCard
jest.mock('../../components/page/order/OrderCard', () => (props: any) => (
  <div data-testid="order-card">
    <button data-testid="view-status" onClick={props.onViewStatus}>
      View Status
    </button>
    {props.order.id}
  </div>
));

// Mock Pagination
jest.mock('../../components/shared/Pagination', () => (props: any) => (
  <div data-testid="pagination" onClick={() => props.onPageChange(2)}>
    Pagination {props.currentPage}/{props.totalPages}
  </div>
));

// Mock useOrderSearch
const setSearchParams = jest.fn();
jest.mock('../../hooks/order', () => ({
  useOrderSearch: () => ({
    orders: [
      {
        id: 'order1',
        createdAt: '2024-07-06T12:00:00Z',
        status: 'NEW',
        orderTracks: [],
        total: 100,
      },
    ],
    loading: false,
    pageable: { pageable: { pageNumber: 0 }, totalPages: 2 },
    searchParams: { keyword: '', status: undefined },
    setSearchParams,
  }),
}));

// Mock useSettingsContext
jest.mock('../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [{ key: 'CurrencyCode', value: 'VND' }],
  }),
}));

describe('OrdersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders breadcrumb and page header', () => {
    render(<OrdersPage />);
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('order.title')).toBeInTheDocument();
  });

  it('renders search and filter UI', () => {
    render(<OrdersPage />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('order.searchOrders')
    ).toBeInTheDocument();
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('renders order cards and pagination', () => {
    render(<OrdersPage />);
    expect(screen.getByTestId('order-card')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('calls setSearchParams on search input change', () => {
    render(<OrdersPage />);
    const input = screen.getByPlaceholderText('order.searchOrders');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setSearchParams).toHaveBeenCalledWith({ keyword: 'test' });
  });

  it('calls setSearchParams on status filter change', () => {
    render(<OrdersPage />);
    const select = screen.getByDisplayValue('order.allStatuses');
    fireEvent.change(select, { target: { value: 'NEW' } });
    expect(setSearchParams).toHaveBeenCalledWith({ status: 'NEW' });
  });

  it('calls setSearchParams on pagination click', () => {
    render(<OrdersPage />);
    fireEvent.click(screen.getByTestId('pagination'));
    expect(setSearchParams).toHaveBeenCalledWith({ page: 1 });
  });
});
