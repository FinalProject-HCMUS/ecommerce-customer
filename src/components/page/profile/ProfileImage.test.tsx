import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileImage from './ProfileImage';

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
      [key: string]: any;
    }) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('ProfileImage Component', () => {
  const mockOnImageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(
      <ProfileImage
        previewImage=""
        isEditing={false}
        onImageChange={mockOnImageChange}
      />
    );

    // Check if the component renders
    expect(screen.getByAltText('Profile')).toBeInTheDocument();

    // Should use placeholder image when previewImage is empty
    expect(screen.getByAltText('Profile')).toHaveAttribute(
      'src',
      '/placeholder.svg'
    );

    // Camera icon should not be visible when not editing
    expect(
      screen.queryByRole('img', { name: /camera/i })
    ).not.toBeInTheDocument();
  });

  test('renders with provided image', () => {
    render(
      <ProfileImage
        previewImage="test-image.jpg"
        isEditing={false}
        onImageChange={mockOnImageChange}
      />
    );

    // Should use the provided image
    expect(screen.getByAltText('Profile')).toHaveAttribute(
      'src',
      'test-image.jpg'
    );
  });

  test('clicking does not trigger file input when not in editing mode', () => {
    render(
      <ProfileImage
        previewImage="test-image.jpg"
        isEditing={false}
        onImageChange={mockOnImageChange}
      />
    );

    // Mock the click method of the hidden file input
    const clickMock = jest.fn();
    HTMLInputElement.prototype.click = clickMock;

    // Click on the image container
    fireEvent.click(screen.getByTestId('motion-div'));

    // File input click should not be triggered
    expect(clickMock).not.toHaveBeenCalled();
  });

  test('clicking does not trigger file input when uploading', () => {
    render(
      <ProfileImage
        previewImage="test-image.jpg"
        isEditing={true}
        isUploading={true}
        onImageChange={mockOnImageChange}
      />
    );

    // Mock the click method of the hidden file input
    const clickMock = jest.fn();
    HTMLInputElement.prototype.click = clickMock;

    // Click on the image container
    fireEvent.click(screen.getByTestId('motion-div'));

    // File input click should not be triggered
    expect(clickMock).not.toHaveBeenCalled();
  });

  test('matches snapshot', () => {
    const { container } = render(
      <ProfileImage
        previewImage="test-image.jpg"
        isEditing={true}
        onImageChange={mockOnImageChange}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
