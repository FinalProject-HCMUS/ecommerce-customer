import { render, screen } from '@testing-library/react';
import App from './policy';

// Mock PolicyPage component
jest.mock('../../components/page/policy/PolicyPage', () => () => (
  <div data-testid="policy-page">Policy Content</div>
));

describe('Policy App Page', () => {
  it('renders PolicyPage inside container', () => {
    render(<App />);
    expect(screen.getByTestId('policy-page')).toBeInTheDocument();
    expect(screen.getByText('Policy Content')).toBeInTheDocument();
  });
});
