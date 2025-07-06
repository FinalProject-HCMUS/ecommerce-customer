import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserDropdown from '../UserDropdown';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock useDispatch and useSelector
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

const userInfo = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  photo: '',
};

const renderWithProviders = (user = userInfo) => {
  mockUseSelector.mockImplementation((selector: any) =>
    selector({ auth: { userInfo: user } })
  );
  return render(
    <Provider
      store={
        {
          getState: () => ({ auth: { userInfo: user } }),
          subscribe: () => {},
          dispatch: () => {},
        } as any
      }
    >
      <MemoryRouter>
        <UserDropdown />
      </MemoryRouter>
    </Provider>
  );
};

describe('UserDropdown', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user info', () => {
    renderWithProviders();
    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('opens and closes dropdown on button click and outside click', async () => {
    renderWithProviders();
    const button = screen.getByRole('button');
    // Open
    fireEvent.click(button);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // Close by outside click
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('navigates to profile and closes dropdown', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByRole('button'));
    const profileLink = screen.getByText('hyperlink.profile');
    fireEvent.click(profileLink);
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('navigates to change password and closes dropdown', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByRole('button'));
    const changePasswordLink = screen.getByText('hyperlink.changePassword');
    fireEvent.click(changePasswordLink);
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('calls logout and closes dropdown', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByRole('button'));
    const logoutButton = screen.getByText('hyperlink.logOut');
    fireEvent.click(logoutButton);
    expect(mockDispatch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('calls onClose prop when dropdown closes', () => {
    const onClose = jest.fn();
    render(
      <Provider
        store={
          {
            getState: () => ({ auth: { userInfo } }),
            subscribe: () => {},
            dispatch: () => {},
          } as any
        }
      >
        <MemoryRouter>
          <UserDropdown onClose={onClose} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });
});
