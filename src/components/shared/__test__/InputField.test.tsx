import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../form/InputField';

describe('InputField', () => {
  it('renders label and input with correct props', () => {
    render(<InputField id="username" label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'username');
    expect(screen.getByLabelText('Username')).toHaveAttribute('type', 'text');
  });

  it('renders with custom type and className', () => {
    render(
      <InputField
        id="password"
        label="Password"
        type="password"
        className="custom-class"
      />
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input.className).toMatch(/custom-class/);
  });

  it('passes additional props to input', () => {
    render(
      <InputField
        id="email"
        label="Email"
        placeholder="Enter your email"
        required
      />
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toBeRequired();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<InputField id="test" label="Test" onChange={handleChange} />);
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('abc');
  });
});
