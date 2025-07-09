import { render, screen } from '@testing-library/react';
import SearchHeader from './SearchHeader';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock framer-motion to render children directly
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
}));

describe('SearchHeader', () => {
  it('renders nothing if keySearch is empty', () => {
    const { container } = render(<SearchHeader keySearch="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the search header with keySearch', () => {
    render(<SearchHeader keySearch="shoes" />);
    expect(screen.getByText('lbl.resultSearch shoes')).toBeInTheDocument();
  });
});
