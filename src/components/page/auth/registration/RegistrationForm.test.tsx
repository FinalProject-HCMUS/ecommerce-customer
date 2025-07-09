import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import * as userHook from '../../../../hooks/user';
import { messageRenderUtils } from '../../../../utils';
import { Role } from '../../../../interfaces/user/Role';

// Mock dependencies
jest.mock('../../../../helpers/i18n', () => ({
  t: (key: string): string => {
    const translations: Record<string, string> = {
      'lbl.register': 'Register',
      'lbl.firstName': 'First Name',
      'lbl.lastName': 'Last Name',
      'lbl.email': 'Email',
      'lbl.phone': 'Phone',
      'lbl.password': 'Password',
      'lbl.confirmPassword': 'Confirm Password',
      'placeholder.firstName': 'Enter your first name',
      'placeholder.lastName': 'Enter your last name',
      'placeholder.email': 'Enter your email',
      'placeholder.phone': 'Enter your phone number',
      'placeholder.password': 'Enter your password',
      'placeholder.confirmPassword': 'Confirm your password',
      'btn.createAccount': 'Create Account',
      'error.passwordMismatch': 'Passwords do not match',
      'success.registerSuccess':
        'Registration successful! Please check your email to confirm your account.',
      'lbl.notRegistered': 'Already have an account?',
      'hyperlink.login': 'Sign in',
    };
    return translations[key] || key;
  },
}));

jest.mock('../../../../utils', () => ({
  messageRenderUtils: {
    showError: jest.fn(),
    showSuccess: jest.fn(),
  },
}));

// Mock form components
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
  }: any) => (
    <div data-testid={`input-field-${id}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type || 'text'}
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
  default: ({ id, label, value, onChange, placeholder, required }: any) => (
    <div data-testid={`password-input-${id}`}>
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
    </div>
  ),
}));

jest.mock('../../../shared/Button', () => ({
  GeneralButton: ({ children, type, isLoading, className, onClick }: any) => (
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

jest.mock('../../../../helpers/env', () => ({
  VITE_REDIRECT_URI: 'http://localhost:3000/auth/callback',
  VITE_AUTH_URI: 'https://example.com/auth',
  VITE_CLIENT_ID: 'google-client-id',
}));

describe('RegistrationForm', () => {
  // Mock createUser function
  const mockCreateUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the useUser hook
    jest.spyOn(userHook, 'useUser').mockReturnValue({
      createUser: mockCreateUser,
      user: null,
      loading: false,
      fetchUserById: jest.fn(),
      updateUser: jest.fn(),
      changePassword: jest.fn(),
      fetchUserByToken: jest.fn(),
      confirmUserEmail: jest.fn(),
      resendUserConfirmationEmail: jest.fn(),
      requestPasswordReset: jest.fn(),
      resetPassword: jest.fn(),
    });
  });

  test('renders registration form with all fields', () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Check that all form elements are present
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-firstName')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-lastName')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-phone')).toBeInTheDocument();
    expect(screen.getByTestId('password-input-password')).toBeInTheDocument();
    expect(
      screen.getByTestId('password-input-confirmPassword')
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('updates form values when inputs change', () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Get all input fields
    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByTestId('lastName') as HTMLInputElement;
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      'confirmPassword'
    ) as HTMLInputElement;

    // Change input values
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    // Check that input values were updated
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(phoneInput).toHaveValue('1234567890');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Fill in the form with mismatched passwords
    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByTestId('lastName') as HTMLInputElement;
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      'confirmPassword'
    ) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'differentpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));

    // Check that error message was shown
    await waitFor(() => {
      expect(messageRenderUtils.showError).toHaveBeenCalledWith(
        'Passwords do not match'
      );
    });

    // Check that createUser was not called
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  test('submits form successfully with valid data', async () => {
    // Setup mock to return success
    const userResponse = {
      id: 'user-123',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      enabled: true,
      role: Role.USER,
      createdAt: '2023-07-05T10:30:00Z',
      updatedAt: '2023-07-05T10:30:00Z',
      createdBy: 'system',
      updatedBy: 'system',
    };

    mockCreateUser.mockResolvedValueOnce(userResponse);

    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Fill in the form
    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByTestId('lastName') as HTMLInputElement;
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      'confirmPassword'
    ) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));

    // Check that the button shows loading state
    expect(screen.getByTestId('submit-button')).toHaveAttribute(
      'data-loading',
      'true'
    );

    // Check that createUser was called with correct data
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        role: 'USER',
      });
    });

    // Check success message was shown
    expect(messageRenderUtils.showSuccess).toHaveBeenCalledWith(
      'Registration successful! Please check your email to confirm your account.'
    );

    // Check that form was reset
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(phoneInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(confirmPasswordInput).toHaveValue('');
    });
  });

  test('handles API error on form submission', async () => {
    // Setup mock to return failure
    mockCreateUser.mockResolvedValueOnce(null);

    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Fill in the form
    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByTestId('lastName') as HTMLInputElement;
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      'confirmPassword'
    ) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));

    // Check that createUser was called
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
    });

    // Success message should not be shown
    expect(messageRenderUtils.showSuccess).not.toHaveBeenCalled();

    // Form should not be reset
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  test('renders the link to login page', () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    const loginLink = screen.getByText('Sign in');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });

  test('form submission via Enter key works', async () => {
    // Setup mock to return success
    mockCreateUser.mockResolvedValueOnce({
      id: 'user-123',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      enabled: true,
      role: Role.USER,
      createdAt: '2023-07-05T10:30:00Z',
      updatedAt: '2023-07-05T10:30:00Z',
      createdBy: 'system',
      updatedBy: 'system',
    });

    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Fill in the form
    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByTestId('lastName') as HTMLInputElement;
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      'confirmPassword'
    ) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    // Submit form with Enter key
    fireEvent.submit(screen.getByTestId('submit-button').closest('form')!);

    // Verify the form submission was processed
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
      expect(messageRenderUtils.showSuccess).toHaveBeenCalled();
    });
  });
});
