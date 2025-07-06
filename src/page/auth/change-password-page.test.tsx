import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangePasswordPage from './change-password-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock showError and showSuccess
const showError = jest.fn();
const showSuccess = jest.fn();
jest.mock('../../utils/messageRender', () => ({
  showError: (...args: any[]) => showError(...args),
  showSuccess: (...args: any[]) => showSuccess(...args),
}));

// Mock useUser
const changePassword = jest.fn();
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    changePassword,
    loading: false,
  }),
}));

// Mock useDispatch and useSelector
const dispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => dispatch,
  useSelector: (fn: any) => fn({ auth: { userInfo: { id: 'user1' } } }),
}));

// Mock logout
jest.mock('../../context/authSlice', () => ({
  logout: () => ({ type: 'LOGOUT' }),
}));

// Mock PasswordInput and GeneralButton
jest.mock('../../components/shared/form/PasswordInput', () => (props: any) => (
  <input
    data-testid={props.id}
    id={props.id}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    type="password"
  />
));
jest.mock('../../components/shared/Button', () => ({
  GeneralButton: (props: any) => (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      disabled={props.isLoading}
    >
      {props.children}
    </button>
  ),
}));

// Mock lucide-react Lock icon
jest.mock('lucide-react', () => ({
  Lock: (props: any) => <svg data-testid="lock-icon" {...props} />,
}));

describe('ChangePasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all password fields and submit button', () => {
    render(<ChangePasswordPage />);
    expect(screen.getByTestId('currentPassword')).toBeInTheDocument();
    expect(screen.getByTestId('newPassword')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'btn.changePassword' })).toBeInTheDocument();
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });

  it('shows error if current password is empty', async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('error.currentPasswordRequired');
      expect(changePassword).not.toHaveBeenCalled();
    });
  });

  it('shows error if new password is empty', async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('currentPassword'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('error.newPasswordRequired');
      expect(changePassword).not.toHaveBeenCalled();
    });
  });

  it('shows error if new password is less than 8 characters', async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('currentPassword'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'short' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('error.passwordLength');
      expect(changePassword).not.toHaveBeenCalled();
    });
  });

  it('shows error if confirm password is empty', async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('currentPassword'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('error.confirmPasswordRequired');
      expect(changePassword).not.toHaveBeenCalled();
    });
  });

  it('shows error if new password and confirm password do not match', async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('currentPassword'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'differentpass' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('error.passwordMismatch');
      expect(changePassword).not.toHaveBeenCalled();
    });
  });

  it('calls changePassword and shows success on valid input', async () => {
    changePassword.mockResolvedValueOnce(true);
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('currentPassword'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(changePassword).toHaveBeenCalledWith('user1', {
        currentPassword: 'oldpass',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123',
      });
      expect(showSuccess).toHaveBeenCalledWith('success.passwordChanged');
      expect(dispatch).toHaveBeenCalled();
    });
  });

  it('resets form after successful password change', async () => {
    changePassword.mockResolvedValueOnce(true);
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByTestId('currentPassword'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'btn.changePassword' }));
    await waitFor(() => {
      expect(screen.getByTestId('currentPassword')).toHaveValue('');
      expect(screen.getByTestId('newPassword')).toHaveValue('');
      expect(screen.getByTestId('confirmPassword')).toHaveValue('');
    });
  });
});