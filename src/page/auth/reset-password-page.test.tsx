const toast = { error: jest.fn(), success: jest.fn() };

jest.mock('react-toastify', () => ({
  toast,
}));
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPasswordPage from './reset-password-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock useUser
const resetPassword = jest.fn();
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    resetPassword,
    loading: false,
  }),
}));

// Mock GeneralButton
jest.mock('../../components/shared/Button', () => ({
  GeneralButton: (props: any) => (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  ),
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock PasswordInput
jest.mock('../../components/shared/form/PasswordInput', () => (props: any) => (
  <input
    data-testid={props.id}
    id={props.id}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    className={props.className}
    required={props.required}
    type="password"
  />
));

// Mock useNavigate and useSearchParams
const navigate = jest.fn();
let searchParamsValue: string | null = 'token123';
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
    useSearchParams: () => [
      {
        get: (key: string) => (key === 'token' ? searchParamsValue : null),
      },
    ],
    Link: (props: any) => <a {...props} />,
  };
});

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchParamsValue = 'token123';
  });

  it('renders form fields and breadcrumb', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByTestId('newPassword')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'auth.resetPassword' })
    ).toBeInTheDocument();
  });

  it('redirects if no token is present', () => {
    searchParamsValue = null;
    render(<ResetPasswordPage />);
    expect(toast.error).toHaveBeenCalledWith('error.commonError');
    expect(navigate).toHaveBeenCalledWith('/request-password-reset');
  });

  it('shows error if new password is less than 8 characters', async () => {
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByTestId('newPassword'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'auth.resetPassword' }));
    await waitFor(() => {
      expect(screen.getByText('error.passwordLength')).toBeInTheDocument();
      expect(resetPassword).not.toHaveBeenCalled();
    });
  });

  it('shows error if passwords do not match', async () => {
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByTestId('newPassword'), {
      target: { value: 'longenough' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'different' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'auth.resetPassword' }));
    await waitFor(() => {
      expect(screen.getByText('error.passwordMismatch')).toBeInTheDocument();
      expect(resetPassword).not.toHaveBeenCalled();
    });
  });

  it('calls resetPassword and navigates to login on success', async () => {
    resetPassword.mockResolvedValueOnce(true);
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByTestId('newPassword'), {
      target: { value: 'longenough' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'longenough' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'auth.resetPassword' }));
    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        newPassword: 'longenough',
        confirmPassword: 'longenough',
        token: 'token123',
      });
      expect(toast.success).toHaveBeenCalledWith('success.passwordChanged');
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error toast if resetPassword fails', async () => {
    resetPassword.mockResolvedValueOnce(false);
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByTestId('newPassword'), {
      target: { value: 'longenough' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'longenough' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'auth.resetPassword' }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('error.passwordUpdateFailed');
    });
  });
});
