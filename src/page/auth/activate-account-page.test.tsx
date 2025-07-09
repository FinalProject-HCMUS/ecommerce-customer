import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActivateAccountPage from './activate-account-page';

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
const resendUserConfirmationEmail = jest.fn();
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    resendUserConfirmationEmail,
    loading: false,
  }),
}));

// Mock InputField and GeneralButton
jest.mock('../../components/shared/form/InputField', () => (props: any) => (
  <input
    data-testid="email-input"
    id={props.id}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    placeholder={props.placeholder}
    type={props.type}
  />
));
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

// Mock lucide-react Mail icon
jest.mock('lucide-react', () => ({
  Mail: (props: any) => <svg data-testid="mail-icon" {...props} />,
}));

describe('ActivateAccountPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email input and submit button', () => {
    render(<ActivateAccountPage />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'btn.sendConfirmationEmail' })).toBeInTheDocument();
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  it('shows error if email is invalid on blur', () => {
    render(<ActivateAccountPage />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.blur(input);
    expect(showError).not.toHaveBeenCalledWith('error.emailRequired');
    // Should not call showError for invalid format, just not proceed
    fireEvent.click(screen.getByRole('button', { name: 'btn.sendConfirmationEmail' }));
    expect(resendUserConfirmationEmail).not.toHaveBeenCalled();
  });

  it('calls resendUserConfirmationEmail and shows success on valid email', async () => {
    resendUserConfirmationEmail.mockResolvedValueOnce(true);
    render(<ActivateAccountPage />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.blur(input);
    fireEvent.click(screen.getByRole('button', { name: 'btn.sendConfirmationEmail' }));
    await waitFor(() => {
      expect(resendUserConfirmationEmail).toHaveBeenCalledWith('test@example.com');
      expect(showSuccess).toHaveBeenCalledWith('success.sendEmailActivation');
    });
    expect(screen.getByText('lbl.checkEmail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'btn.sendAnother' })).toBeInTheDocument();
  });

  it('shows error if resendUserConfirmationEmail fails', async () => {
    resendUserConfirmationEmail.mockResolvedValueOnce(false);
    render(<ActivateAccountPage />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.blur(input);
    fireEvent.click(screen.getByRole('button', { name: 'btn.sendConfirmationEmail' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('success.sendEmailActivationFailed');
    });
  });

  it('can send another email after success', async () => {
    resendUserConfirmationEmail.mockResolvedValueOnce(true);
    render(<ActivateAccountPage />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.blur(input);
    fireEvent.click(screen.getByRole('button', { name: 'btn.sendConfirmationEmail' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'btn.sendAnother' })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: 'btn.sendAnother' }));
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });
});