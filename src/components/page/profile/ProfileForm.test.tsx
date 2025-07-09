import { render, screen, fireEvent } from '@testing-library/react';
import ProfileForm from './ProfileForm';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock InputField
jest.mock('../../shared/form/InputField', () => (props: any) => (
  <input
    data-testid={props.id}
    id={props.id}
    value={props.value}
    onChange={props.onChange}
    disabled={props.disabled}
    placeholder={props.placeholder}
  />
));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
}));

// Mock lucide-react Save icon
jest.mock('lucide-react', () => ({
  Save: (props: any) => <svg data-testid="save-icon" {...props} />,
}));

const mockFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNumber: '123456789',
  address: '123 Main St',
  weight: '70',
  height: '175',
};

describe('ProfileForm', () => {
  it('renders all fields with correct values', () => {
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={false}
        isSaving={false}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        cancelEdit={jest.fn()}
      />
    );
    expect(screen.getByTestId('firstName')).toHaveValue('John');
    expect(screen.getByTestId('lastName')).toHaveValue('Doe');
    expect(screen.getByTestId('email')).toHaveValue('john@example.com');
    expect(screen.getByTestId('phone')).toHaveValue('123456789');
    expect(screen.getByTestId('weight')).toHaveValue('70');
    expect(screen.getByTestId('height')).toHaveValue('175');
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
  });

  it('disables fields when not editing', () => {
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={false}
        isSaving={false}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        cancelEdit={jest.fn()}
      />
    );
    expect(screen.getByTestId('firstName')).toBeDisabled();
    expect(screen.getByTestId('lastName')).toBeDisabled();
    expect(screen.getByTestId('phone')).toBeDisabled();
    expect(screen.getByTestId('weight')).toBeDisabled();
    expect(screen.getByTestId('height')).toBeDisabled();
    expect(screen.getByTestId('email')).toBeDisabled();
  });

  it('enables fields when editing', () => {
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={true}
        isSaving={false}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        cancelEdit={jest.fn()}
      />
    );
    expect(screen.getByTestId('firstName')).not.toBeDisabled();
    expect(screen.getByTestId('lastName')).not.toBeDisabled();
    expect(screen.getByTestId('phone')).not.toBeDisabled();
    expect(screen.getByTestId('weight')).not.toBeDisabled();
    expect(screen.getByTestId('height')).not.toBeDisabled();
    // Email should always be disabled
    expect(screen.getByTestId('email')).toBeDisabled();
  });

  it('calls handleChange when a field is changed', () => {
    const handleChange = jest.fn();
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={true}
        isSaving={false}
        handleChange={handleChange}
        handleSubmit={jest.fn()}
        cancelEdit={jest.fn()}
      />
    );
    fireEvent.change(screen.getByTestId('firstName'), {
      target: { value: 'Jane' },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls cancelEdit when Cancel button is clicked', () => {
    const cancelEdit = jest.fn();
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={true}
        isSaving={false}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        cancelEdit={cancelEdit}
      />
    );
    fireEvent.click(screen.getByText('lbl.cancel'));
    expect(cancelEdit).toHaveBeenCalled();
  });

  it('shows saving spinner and disables submit when isSaving is true', () => {
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={true}
        isSaving={true}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        cancelEdit={jest.fn()}
      />
    );
    expect(screen.getByText('lbl.saving')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /lbl.saving/i })).toBeDisabled();
  });

  it('shows Save icon and Save Changes text when not saving', () => {
    render(
      <ProfileForm
        formData={mockFormData as any}
        isEditing={true}
        isSaving={false}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        cancelEdit={jest.fn()}
      />
    );
    expect(screen.getByTestId('save-icon')).toBeInTheDocument();
    expect(screen.getByText('lbl.saveChanges')).toBeInTheDocument();
  });
});
