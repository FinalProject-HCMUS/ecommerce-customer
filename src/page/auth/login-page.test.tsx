import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './login-page';

// Mock the LoginForm component
jest.mock('../../components/page/auth/login/LoginForm', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-login-form">Login Form Component</div>,
}));

describe('LoginPage', () => {
  test('renders without errors', () => {
    render(<LoginPage />);
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();
  });

  test('renders with correct container structure', () => {
    const { container } = render(<LoginPage />);

    // Check the outer container
    const outerContainer = container.firstChild;
    expect(outerContainer).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'bg-white',
      'my-12',
      'p-4'
    );

    // Check the inner container
    const innerContainer = outerContainer?.firstChild;
    expect(innerContainer).toHaveClass('w-full', 'max-w-md');
  });

  test('renders the LoginForm component', () => {
    render(<LoginPage />);

    // Check that the LoginForm is rendered
    const loginForm = screen.getByTestId('mock-login-form');
    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toHaveTextContent('Login Form Component');

    // Check that LoginForm is inside the correct container
    const loginFormParent = loginForm.parentElement;
    expect(loginFormParent).toHaveClass('w-full', 'max-w-md');
  });

  test('matches snapshot', () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
