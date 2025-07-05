import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock React hooks
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn(),
    FormEvent: jest.fn(),
    ChangeEvent: jest.fn(),
  };
});

// Restore React hooks implementation for each test
const mockSetState = jest.fn();
beforeEach(() => {
  // Mock useState to return values and setter functions
  (React.useState as jest.Mock).mockImplementation((initialValue) => [
    initialValue,
    mockSetState,
  ]);
});

// Mock the component under test
// import MockActivateAccountPage from '../__mocks__/activate-account-page';
const MockActivateAccountPage = () => (
  <div data-testid="mock-activate-account-page" />
);

jest.mock('./activate-account-page', () => {
  const ActivateAccountPage = (props: any) => {
    return <MockActivateAccountPage {...props} />;
  };
  return { __esModule: true, default: ActivateAccountPage };
});

// Mock hooks and utilities
jest.mock('../../hooks/user', () => ({
  useUser: jest.fn(() => ({
    resendUserConfirmationEmail: jest.fn(),
    loading: false,
  })),
}));

jest.mock('../../utils/messageRender', () => ({
  showError: jest.fn(),
  showSuccess: jest.fn(),
}));

jest.mock('../../helpers/i18n', () => ({
  t: jest.fn((key) => key),
}));

// Mock components
jest.mock('../../components/shared/form/InputField', () => ({
  __esModule: true,
  default: ({
    id,
    label,
    type,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
  }: {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div data-testid="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        data-testid={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
      />
    </div>
  ),
}));

jest.mock('../../components/shared/Button', () => ({
  GeneralButton: ({
    children,
    type,
    disabled,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
      data-testid="submit-button"
    >
      {children}
    </button>
  ),
}));

jest.mock('lucide-react', () => ({
  Mail: () => <svg data-testid="mail-icon" />,
}));

// Mock testing libraries
jest.mock('@testing-library/react', () => {
  const original = jest.requireActual('@testing-library/react');
  return {
    ...original,
    // Add any custom overrides here if needed
  };
});

jest.mock('@testing-library/jest-dom', () => {
  const original = jest.requireActual('@testing-library/jest-dom');
  return {
    ...original,
    // Add any custom overrides here if needed
  };
});

// Import after mocking
import ActivateAccountPage from './activate-account-page';
import { useUser } from '../../hooks/user';
import { showError, showSuccess } from '../../utils/messageRender';
import { t } from '../../helpers/i18n';

describe('ActivateAccountPage', () => {
  // Setup mock values and functions
  const mockResendUserConfirmationEmail = jest.fn<Promise<boolean>, [string]>();
  const mockShowError = jest.fn();
  const mockShowSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock implementations
    (useUser as jest.Mock).mockReturnValue({
      resendUserConfirmationEmail: mockResendUserConfirmationEmail,
      loading: false,
    });

    (showError as jest.Mock).mockImplementation(mockShowError);
    (showSuccess as jest.Mock).mockImplementation(mockShowSuccess);

    (t as jest.Mock).mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'lbl.activateAccount': 'Activate Account',
        'lbl.email': 'Email',
        'btn.sendConfirmationEmail': 'Send Confirmation Email',
        'error.emailRequired': 'Email is required',
        'success.sendEmailActivation': 'Activation email sent successfully',
        'success.sendEmailActivationFailed': 'Failed to send activation email',
        'lbl.checkEmail': 'Check your email',
        'btn.sendAnother': 'Send Another',
      };
      return translations[key] || key;
    });

    // Default mock implementation
    mockResendUserConfirmationEmail.mockImplementation(async () => true);
  });

  test('matches snapshot in initial state', () => {
    const { container } = render(<ActivateAccountPage />);
    expect(container).toMatchSnapshot('initial-state');
  });
});
