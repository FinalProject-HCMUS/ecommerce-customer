import { render, screen, waitFor } from '@testing-library/react';
import ConfirmEmailPage from './confirm-email-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock useUser
const confirmUserEmail = jest.fn();
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    confirmUserEmail,
    loading: false,
  }),
}));

// Mock react-router-dom
const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    Link: (props: any) => <a {...props} />,
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  CheckCircle: (props: any) => <svg data-testid="check-circle" {...props} />,
  XCircle: (props: any) => <svg data-testid="x-circle" {...props} />,
}));

describe('ConfirmEmailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    mockUseLocation.mockReturnValue({ search: '?token=abc' });
    render(<ConfirmEmailPage />);
    expect(screen.getByText('lbl.verifyingEmail')).toBeInTheDocument();
    expect(screen.getByText('lbl.pleaseWait')).toBeInTheDocument();
  });

  it('shows error state if no token in query', async () => {
    mockUseLocation.mockReturnValue({ search: '' });
    render(<ConfirmEmailPage />);
    await waitFor(() => {
      expect(
        screen.getByText('lbl.emailConfirmationFailed')
      ).toBeInTheDocument();
      expect(
        screen.getByText('lbl.emailConfirmationFailedDescription')
      ).toBeInTheDocument();
      expect(
        screen.getByText('lbl.requestNewConfirmation')
      ).toBeInTheDocument();
      expect(screen.getByTestId('x-circle')).toBeInTheDocument();
    });
  });

  it('shows success state if confirmUserEmail returns true', async () => {
    mockUseLocation.mockReturnValue({ search: '?token=abc' });
    confirmUserEmail.mockResolvedValueOnce(true);
    render(<ConfirmEmailPage />);
    await waitFor(() => {
      expect(screen.getByText('lbl.emailConfirmed')).toBeInTheDocument();
      expect(screen.getByText('lbl.proceedToLogin')).toBeInTheDocument();
      expect(screen.getByTestId('check-circle')).toBeInTheDocument();
    });
  });

  it('shows error state if confirmUserEmail returns false', async () => {
    mockUseLocation.mockReturnValue({ search: '?token=abc' });
    confirmUserEmail.mockResolvedValueOnce(false);
    render(<ConfirmEmailPage />);
    await waitFor(() => {
      expect(
        screen.getByText('lbl.emailConfirmationFailed')
      ).toBeInTheDocument();
      expect(
        screen.getByText('lbl.emailConfirmationFailedDescription')
      ).toBeInTheDocument();
      expect(
        screen.getByText('lbl.requestNewConfirmation')
      ).toBeInTheDocument();
      expect(screen.getByTestId('x-circle')).toBeInTheDocument();
    });
  });
});
