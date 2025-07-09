import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock LanguageSwitcher and UserDropdown to simple components for isolation
jest.mock('../LanguageSwitcher', () => () => (
  <div data-testid="language-switcher" />
));
jest.mock('../UserDropdown', () => () => <div data-testid="user-dropdown" />);

// Mock useSelector globally
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) => mockUseSelector(selector),
}));

const renderWithProviders = (isAuthenticated = false) => {
  mockUseSelector.mockImplementation((selector: any) =>
    selector({
      auth: {
        isAuthenticated,
        userInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
        },
      },
    })
  );
  return render(
    <Provider
      store={
        {
          getState: () => ({ auth: { isAuthenticated } }),
          subscribe: () => {},
          dispatch: () => {},
        } as any
      }
    >
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
};

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders shop name and navigation links', () => {
    renderWithProviders(false);
    expect(screen.getByText('shopName')).toBeInTheDocument();
    expect(screen.getByText('navbar.products')).toBeInTheDocument();
    expect(screen.getByText('navbar.policy')).toBeInTheDocument();
    expect(screen.getByText('navbar.blog')).toBeInTheDocument();
    // Authenticated links should not be visible
    expect(screen.queryByText('navbar.chat')).not.toBeInTheDocument();
    expect(screen.queryByText('navbar.orders')).not.toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    renderWithProviders(false);
    expect(screen.getByText('login')).toBeInTheDocument();
    // Cart and user dropdown should not be present
    expect(screen.queryByTestId('user-dropdown')).not.toBeInTheDocument();
  });

  it('shows cart and user dropdown when authenticated', () => {
    renderWithProviders(true);
    expect(screen.getByTestId('user-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('cart-button')).toBeInTheDocument(); // Cart button (icon only)
    // Authenticated links should be visible
    expect(screen.getByText('navbar.chat')).toBeInTheDocument();
    expect(screen.getByText('navbar.orders')).toBeInTheDocument();
    // Login button should not be present
    expect(screen.queryByText('login')).not.toBeInTheDocument();
  });

  it('renders LanguageSwitcher', () => {
    renderWithProviders(false);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });
});
