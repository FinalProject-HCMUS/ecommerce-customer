import { render, screen } from '@testing-library/react';
import Page403 from './Page403';

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

describe('Page403', () => {
  it('renders 403 result with buttons', () => {
    render(<Page403 />);
    expect(screen.getByTestId('result')).toBeInTheDocument();
    expect(screen.getByTestId('result-status')).toHaveTextContent('403');
    expect(screen.getByTestId('result-title')).toHaveTextContent('403');
    expect(screen.getByTestId('back-home-btn')).toBeInTheDocument();
    expect(screen.getByTestId('logout-btn')).toBeInTheDocument();
  });
});
