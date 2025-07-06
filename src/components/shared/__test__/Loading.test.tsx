import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('Loading', () => {
  it('renders loading text', () => {
    render(<Loading />);
    expect(screen.getByText('lbl.loading')).toBeInTheDocument();
    expect(screen.getByText('lbl.loading')).toHaveClass('animate-pulse');
  });
});