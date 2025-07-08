import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RequestPasswordResetPage from './request-password-reset-page';

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
const requestPasswordReset = jest.fn();
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    requestPasswordReset,
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

// Mock Link
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Link: (props: any) => <a {...props} />,
    useNavigate: () => jest.fn(),
  };
});

describe('RequestPasswordResetPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email input and submit button', () => {
    render(<RequestPasswordResetPage />);
    expect(screen.getByLabelText('auth.email')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'auth.sendResetLink' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  });

  it('calls requestPasswordReset and shows success on valid email', async () => {
    requestPasswordReset.mockResolvedValueOnce(true);
    render(<RequestPasswordResetPage />);
    fireEvent.change(screen.getByLabelText('auth.email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'auth.sendResetLink' }));
    await waitFor(() => {
      expect(requestPasswordReset).toHaveBeenCalledWith('test@example.com');
      expect(showSuccess).toHaveBeenCalledWith('auth.resetEmailSent');
      expect(screen.getByText('auth.checkYourEmail')).toBeInTheDocument();
      expect(
        screen.getByText('auth.resetEmailInstructions')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'auth.backToLogin' })
      ).toBeInTheDocument();
    });
  });

  it('shows error if requestPasswordReset fails', async () => {
    requestPasswordReset.mockResolvedValueOnce(false);
    render(<RequestPasswordResetPage />);
    fireEvent.change(screen.getByLabelText('auth.email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'auth.sendResetLink' }));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith('auth.resetEmailFailed');
    });
  });
});
