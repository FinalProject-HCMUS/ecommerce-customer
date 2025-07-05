import React from 'react';
import { render } from '@testing-library/react';
import { withUnAuthenticatedUser } from '../withUnAuthenticatedUser';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Mock useSelector from react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mock Navigate from react-router-dom
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate">Navigate to {to}</div>,
  };
});

const DummyComponent: React.FC = () => <div data-testid="dummy">UnAuthenticated Content</div>;
const WrappedComponent = withUnAuthenticatedUser(DummyComponent);

describe('withUnAuthenticatedUser HOC', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders wrapped component when not authenticated', () => {
    ((useSelector as unknown) as jest.Mock).mockImplementation(cb =>
      cb({ auth: { isAuthenticated: false, userInfo: null, accessToken: null } })
    );

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <WrappedComponent />
      </MemoryRouter>
    );

    expect(getByTestId('dummy')).toBeInTheDocument();
    expect(queryByTestId('navigate')).toBeNull();
  });

  test('redirects to home when authenticated', () => {
    ((useSelector as unknown) as jest.Mock).mockImplementation(cb =>
      cb({
        auth: {
          isAuthenticated: true,
          userInfo: { id: '1', email: 'test@example.com' },
          accessToken: 'token',
        },
      })
    );

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <WrappedComponent />
      </MemoryRouter>
    );

    expect(getByTestId('navigate')).toHaveTextContent('Navigate to /');
    expect(queryByTestId('dummy')).toBeNull();
  });
});