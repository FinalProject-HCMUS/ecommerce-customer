import { render, screen, waitFor } from '@testing-library/react';
import Authenticate from './authenticate-page';

// Mock hooks and dependencies
const authenticateWithCode = jest.fn();
const fetchUserByToken = jest.fn();
const dispatch = jest.fn();
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));
jest.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}));
jest.mock('../../hooks/auth', () => ({
  useAuth: () => ({
    authenticateWithCode,
  }),
}));
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    fetchUserByToken,
  }),
}));

jest.mock('../../utils/messageRender', () => ({
  showError: jest.fn(),
}));
jest.mock('../../context/authSlice', () => ({
  login: (payload: any) => ({ type: 'LOGIN', payload }),
}));
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));
jest.mock('../../constants/localStorage', () => ({
  TOKEN: 'TOKEN',
}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Box: (props: any) => <div data-testid="mui-box" {...props} />,
  CircularProgress: () => <div data-testid="mui-circular-progress" />,
  Typography: (props: any) => (
    <div data-testid="mui-typography">{props.children}</div>
  ),
}));

describe('Authenticate Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.location.href for each test
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost/' },
      writable: true,
    });
    window.localStorage.clear();
  });

  it('renders loading spinner and authenticating text', () => {
    render(<Authenticate />);
    expect(screen.getByTestId('mui-circular-progress')).toBeInTheDocument();
    expect(screen.getByText('lbl.authenticating')).toBeInTheDocument();
  });

  it('does nothing if no code in URL', () => {
    render(<Authenticate />);
    expect(authenticateWithCode).not.toHaveBeenCalled();
  });
});

it('dispatches login and navigates on success', async () => {
  Object.defineProperty(window, 'location', {
    value: { href: 'http://localhost/?code=abc123' },
    writable: true,
  });
  authenticateWithCode.mockResolvedValueOnce({
    accessToken: 'token',
    refreshToken: 'refresh',
  });
  fetchUserByToken.mockResolvedValueOnce({ id: 'user1', name: 'User' });
  render(<Authenticate />);
  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOGIN',
      payload: {
        userInfo: { id: 'user1', name: 'User' },
        accessToken: 'token',
        refreshAccessToken: 'refresh',
      },
    });
    expect(navigate).toHaveBeenCalledWith('/');
  });
  expect(window.localStorage.getItem('TOKEN')).toBe('token');
});
