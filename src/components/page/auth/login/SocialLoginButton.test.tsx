import { render, screen, fireEvent } from '@testing-library/react';
import SocialLoginButton from './SocialLoginButton';

describe('SocialLoginButton', () => {
  it('renders icon and text', () => {
    render(
      <SocialLoginButton
        icon={<span data-testid="icon">Icon</span>}
        text="Login with Google"
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <SocialLoginButton
        icon={<span>Icon</span>}
        text="Login"
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
