import { render, screen } from '@testing-library/react';
import PolicyPage from './PolicyPage';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock Breadcrumb
jest.mock('../../shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock PolicyContent
jest.mock('./PolicyContent', () => (props: any) => (
  <div data-testid="policy-content">{props.title}</div>
));

describe('PolicyPage', () => {
  it('renders breadcrumb and policy content', () => {
    render(<PolicyPage />);
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb')).toHaveTextContent(
      'breadcrumb.home'
    );
    expect(screen.getByTestId('breadcrumb')).toHaveTextContent(
      'breadcrumb.policy'
    );
    expect(screen.getByTestId('policy-content')).toBeInTheDocument();
    expect(screen.getByTestId('policy-content')).toHaveTextContent(
      'lbl.policy'
    );
  });
});
