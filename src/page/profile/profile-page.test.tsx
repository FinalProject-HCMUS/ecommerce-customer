import { render, screen } from '@testing-library/react';
import ProfilePage from './profile-page';

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

// Mock useDispatch and updateUserInfo
const dispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}));
jest.mock('../../context/authSlice', () => ({
  updateUserInfo: (user: any) => ({ type: 'UPDATE_USER', payload: user }),
}));

// Mock useUser
const fetchUserByToken = jest.fn();
const updateUser = jest.fn();
jest.mock('../../hooks/user', () => ({
  useUser: () => ({
    fetchUserByToken,
    user: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0123456789',
      address: '123 Street',
      height: 180,
      weight: 75,
      photo: 'photo.jpg',
    },
    updateUser,
    loading: false,
  }),
}));

// Mock useImage
const uploadImage = jest.fn();
jest.mock('../../hooks/image', () => ({
  useImage: () => ({
    uploadImage,
    uploading: false,
    error: null,
  }),
}));

// Mock ProfileHeader, ProfileImage, ProfileForm
jest.mock('../../components/page/profile/ProfileHeader', () => (props: any) => (
  <div data-testid="profile-header">{props.showSavedMessage ? 'Saved!' : 'Header'}</div>
));
jest.mock('../../components/page/profile/ProfileImage', () => (props: any) => (
  <div data-testid="profile-image">
    <input
      data-testid="image-input"
      type="file"
      onChange={props.onImageChange}
      disabled={props.isUploading}
    />
    {props.previewImage}
  </div>
));
jest.mock('../../components/page/profile/ProfileForm', () => (props: any) => (
  <form data-testid="profile-form" onSubmit={props.handleSubmit}>
    <input
      data-testid="first-name"
      name="firstName"
      value={props.formData.firstName}
      onChange={props.handleChange}
      disabled={!props.isEditing}
    />
    <button
      data-testid="save-btn"
      type="submit"
      disabled={props.isSaving || !props.isEditing}
    >
      Save
    </button>
    <button data-testid="cancel-btn" type="button" onClick={props.cancelEdit}>
      Cancel
    </button>
  </form>
));

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchUserByToken.mockResolvedValue({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0123456789',
      address: '123 Street',
      height: 180,
      weight: 75,
      photo: 'photo.jpg',
    });
    updateUser.mockResolvedValue({
      id: '1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0123456789',
      address: '123 Street',
      height: 180,
      weight: 75,
      photo: 'photo.jpg',
    });
    uploadImage.mockResolvedValue('new-photo.jpg');
  });

  it('renders loading state if loading or no formData', () => {
    jest.spyOn(require('../../hooks/user'), 'useUser').mockReturnValue({
      fetchUserByToken,
      user: null,
      updateUser,
      loading: true,
    });
    render(<ProfilePage />);
    expect(screen.getByText('lbl.loading')).toBeInTheDocument();
  });

});