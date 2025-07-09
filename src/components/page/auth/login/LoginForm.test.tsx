import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import * as authHook from '../../../../hooks/auth';
import * as userHook from '../../../../hooks/user';
import { messageRenderUtils } from '../../../../utils';
import { login } from '../../../../context/authSlice';
import storageConstants from '../../../../constants/localStorage';
import { Role, UserResponse } from '../../../../interfaces';

// Mock the dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../../helpers/i18n', () => ({
  t: (key: string): string => {
    const translations: Record<string, string> = {
      'lbl.login': 'Login',
      'lbl.email': 'email',
      'placeholder.email': 'Enter your email',
      'lbl.password': 'Password',
      'placeholder.password': 'Enter your password',
      'btn.login': 'Sign in',
      'success.loginSuccess': 'Login successful!',
      'lbl.or': 'OR',
      'lbl.notRegistered': 'Not registered?',
      'hyperlink.register': 'Create account',
      'hyperlink.activateAccount': 'Activate account',
    };
    return translations[key] || key;
  },
}));

// Mock the environment variables helper
jest.mock('../../../../helpers/env', () => ({
  VITE_REDIRECT_URI: 'http://localhost:3000/auth/callback',
  VITE_AUTH_URI: 'https://example.com/auth',
  VITE_CLIENT_ID: 'google-client-id',
}));

// Mock utils
jest.mock('../../../../utils', () => ({
  messageRenderUtils: {
    showSuccess: jest.fn(),
    showError: jest.fn(),
  },
}));

// Mock components
jest.mock('../../../shared/form/InputField', () => ({
  __esModule: true,
  default: ({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required,
  }: {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div data-testid="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={id}
      />
    </div>
  ),
}));

jest.mock('../../../shared/form/PasswordInput', () => ({
  __esModule: true,
  default: ({
    id,
    label,
    value,
    onChange,
    placeholder,
    required,
    forgotPasswordLink,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    forgotPasswordLink?: string;
  }) => (
    <div data-testid="password-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={id}
      />
      {forgotPasswordLink && (
        <a href={forgotPasswordLink} data-testid="forgot-password-link">
          Forgot password?
        </a>
      )}
    </div>
  ),
}));

jest.mock('../../../shared/Button', () => ({
  GeneralButton: ({
    children,
    type,
    isLoading,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={isLoading}
      data-testid="submit-button"
      data-loading={isLoading ? 'true' : 'false'}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  ),
}));

jest.mock('./SocialLoginButton', () => ({
  __esModule: true,
  default: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`social-${text.toLowerCase()}`}>
      {text}
    </button>
  ),
}));

jest.mock('../../../shared/Divider', () => ({
  __esModule: true,
  default: ({ text, className }: { text: string; className?: string }) => (
    <div className={className} data-testid="divider">
      {text}
    </div>
  ),
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock dispatch function
const mockDispatch = jest.fn();

describe('LoginForm', () => {
  // Mock hooks
  const mockLoginUser = jest.fn();
  const mockFetchUserByToken = jest.fn();

  // Original window.location
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();

    // Restore window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'http://localhost:3000' },
    });

    // Mock useAuth hook
    jest.spyOn(authHook, 'useAuth').mockReturnValue({
      loginUser: mockLoginUser,
      loading: false,
      refreshUserToken: jest.fn(),
      logoutUser: jest.fn(),
      validateUserToken: jest.fn(),
      authenticateWithCode: jest.fn(),
    });

    // Mock useUser hook
    jest.spyOn(userHook, 'useUser').mockReturnValue({
      user: null,
      loading: false,
      fetchUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      changePassword: jest.fn(),
      fetchUserByToken: mockFetchUserByToken,
      confirmUserEmail: jest.fn(),
      resendUserConfirmationEmail: jest.fn(),
      requestPasswordReset: jest.fn(),
      resetPassword: jest.fn(),
    });
  });

  afterEach(() => {
    // Restore window.location
    Object.defineProperty(window, 'location', { value: originalLocation });
  });

  test('renders login form with all fields and buttons', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Check for heading
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('social-google')).toBeInTheDocument();

    // Check for links
    expect(screen.getByText('Not registered?')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
    expect(screen.getByText('Activate account')).toBeInTheDocument();
    expect(screen.getByTestId('forgot-password-link')).toBeInTheDocument();
  });

  test('updates form values when inputs change', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;

    // Change input values
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check that input values were updated
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits form successfully with valid credentials', async () => {
    // Mock successful responses
    const tokenResponse = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      accessTokenExpiresAt: 1234567890,
    };

    const userResponse: UserResponse = {
      id: 'user-123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '1234567890',
      enabled: true,
      role: Role.USER,
      createdAt: '2023-07-05T10:30:00Z',
      updatedAt: '2023-07-05T10:30:00Z',
      createdBy: 'system',
      updatedBy: 'system',
    };

    mockLoginUser.mockResolvedValue(tokenResponse);
    mockFetchUserByToken.mockResolvedValue(userResponse);

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Fill in the form
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    // Check loginUser was called with correct data
    expect(mockLoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    await waitFor(() => {
      // Check token was stored in localStorage
      expect(mockLocalStorage.getItem(storageConstants.TOKEN)).toBe(
        'mock-access-token'
      );

      // Check fetchUserByToken was called
      expect(mockFetchUserByToken).toHaveBeenCalled();

      // Check Redux action was dispatched
      expect(mockDispatch).toHaveBeenCalledWith(
        login({
          userInfo: userResponse,
          accessToken: tokenResponse.accessToken,
          refreshAccessToken: tokenResponse.refreshToken,
        })
      );

      // Check success message was shown
      expect(messageRenderUtils.showSuccess).toHaveBeenCalledWith(
        'Login successful!'
      );

      // Check navigation to home page
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('handles failed login attempt', async () => {
    // Mock failed login
    mockLoginUser.mockResolvedValue(null);

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Fill in the form
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      // Check loginUser was called
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      // Check fetchUserByToken was NOT called
      expect(mockFetchUserByToken).not.toHaveBeenCalled();

      // Check Redux action was NOT dispatched
      expect(mockDispatch).not.toHaveBeenCalled();

      // Check navigation was NOT called
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('handles failed user fetch after successful token retrieval', async () => {
    // Mock successful token response but failed user fetch
    const tokenResponse = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      accessTokenExpiresAt: 1234567890,
    };

    mockLoginUser.mockResolvedValue(tokenResponse);
    mockFetchUserByToken.mockResolvedValue(null);

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Fill in the form
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      // Check token was stored in localStorage
      expect(mockLocalStorage.getItem(storageConstants.TOKEN)).toBe(
        'mock-access-token'
      );

      // Check fetchUserByToken was called
      expect(mockFetchUserByToken).toHaveBeenCalled();

      // Check Redux action was NOT dispatched
      expect(mockDispatch).not.toHaveBeenCalled();

      // Check navigation was NOT called
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('shows loading state during login submission', () => {
    // Mock loading state
    jest.spyOn(authHook, 'useAuth').mockReturnValue({
      loginUser: mockLoginUser,
      loading: true,
      refreshUserToken: jest.fn(),
      logoutUser: jest.fn(),
      validateUserToken: jest.fn(),
      authenticateWithCode: jest.fn(),
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Check that button shows loading state
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toHaveAttribute('data-loading', 'true');
    expect(submitButton).toBeDisabled();
  });

  test('redirects to Google login when social button is clicked', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Click on Google login button
    fireEvent.click(screen.getByTestId('social-google'));

    // Expected URL with encoded parameters
    const expectedUrl =
      'https://example.com/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code&client_id=google-client-id&scope=openid%20email%20profile';

    // Check that window.location.href was set to the expected URL
    expect(window.location.href).toBe(expectedUrl);
  });

  test('navigates to registration page when "Create account" is clicked', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const registerLink = screen.getByText('Create account');
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  test('navigates to activate account page when "Activate account" is clicked', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const activateLink = screen.getByText('Activate account');
    expect(activateLink).toHaveAttribute('href', '/activate-account');
  });

  test('has forgot password link', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const forgotPasswordLink = screen.getByTestId('forgot-password-link');
    expect(forgotPasswordLink).toHaveAttribute(
      'href',
      '/request-password-reset'
    );
  });
});
