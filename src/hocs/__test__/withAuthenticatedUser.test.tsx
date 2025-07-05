import React from 'react';
import { render } from '@testing-library/react';
import { withAuthenticatedUser } from '../withAuthenticatedUser';
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

const DummyComponent: React.FC = () => <div data-testid="dummy">Authenticated Content</div>;
const WrappedComponent = withAuthenticatedUser(DummyComponent);

describe('withAuthenticatedUser HOC', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders wrapped component when authenticated', () => {
    ((useSelector as unknown) as jest.Mock).mockImplementation(cb => cb({ auth: { isAuthenticated: true } }));

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <WrappedComponent />
      </MemoryRouter>
    );

    expect(getByTestId('dummy')).toBeInTheDocument();
    expect(queryByTestId('navigate')).toBeNull();
  });

  test('redirects to login when not authenticated', () => {
    ((useSelector as unknown) as jest.Mock).mockImplementation(cb => cb({ auth: { isAuthenticated: false } }));

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <WrappedComponent />
      </MemoryRouter>
    );

    expect(getByTestId('navigate')).toHaveTextContent('Navigate to /login');
    expect(queryByTestId('dummy')).toBeNull();
  });
});