import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '../form/PasswordInput';
import { MemoryRouter } from 'react-router-dom';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('PasswordInput', () => {
  it('renders label and password input', () => {
    render(<PasswordInput id="pw" label="Password" />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('renders forgot password link if provided', () => {
    render(
      <MemoryRouter>
        <PasswordInput id="pw" label="Password" forgotPasswordLink="/forgot" />
      </MemoryRouter>
    );
    expect(screen.getByText('hyperlink.forgotPassword')).toBeInTheDocument();
    expect(
      screen.getByText('hyperlink.forgotPassword').closest('a')
    ).toHaveAttribute('href', '/forgot');
  });

  it('toggles password visibility', () => {
    render(<PasswordInput id="pw" label="Password" />);
    const input = screen.getByLabelText('Password');
    const toggleBtn = screen.getByRole('button');
    // Initially password type
    expect(input).toHaveAttribute('type', 'password');
    // Click to show password
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
    // Click again to hide password
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('passes additional props to input', () => {
    render(
      <PasswordInput
        id="pw"
        label="Password"
        placeholder="Enter password"
        required
      />
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toBeRequired();
  });

  it('applies custom className', () => {
    render(<PasswordInput id="pw" label="Password" className="custom-class" />);
    const input = screen.getByLabelText('Password');
    expect(input.className).toMatch(/custom-class/);
  });
});
