import { render, screen } from '@testing-library/react';
import Page500 from './Page500';

// Mock antd Result
jest.mock('antd', () => ({
  Result: (props: any) => (
    <div data-testid="result">
      <div data-testid="result-status">{props.status}</div>
      <div data-testid="result-title">{props.title}</div>
      <div data-testid="result-extra">{props.extra}</div>
    </div>
  ),
}));

// Mock BackToHomeButton and LogoutButton
jest.mock('../../../components/shared/Button', () => ({
  BackToHomeButton: (props: any) => (
    <button data-testid="back-home-btn" {...props}>
      Back Home
    </button>
  ),
  LogoutButton: (props: any) => (
    <button data-testid="logout-btn" {...props}>
      Logout
    </button>
  ),
}));

describe('Page500', () => {
  it('renders 500 result with buttons', () => {
    render(<Page500 />);
    expect(screen.getByTestId('result')).toBeInTheDocument();
    expect(screen.getByTestId('result-status')).toHaveTextContent('500');
    expect(screen.getByTestId('result-title')).toHaveTextContent('500');
    expect(screen.getByTestId('back-home-btn')).toBeInTheDocument();
    expect(screen.getByTestId('logout-btn')).toBeInTheDocument();
  });
});
