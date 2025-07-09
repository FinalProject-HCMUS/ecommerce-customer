import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock navbarSearchPlaceholder
jest.mock('../../../data/navbar', () => ({
  navbarSearchPlaceholder: 'Search products...',
}));

// Mock FiSearch icon
jest.mock('react-icons/fi', () => ({
  FiSearch: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

describe('SearchInput', () => {
  it('renders input with correct placeholder', () => {
    render(<SearchInput keySearch="" setKeySearch={jest.fn()} />);
    expect(
      screen.getByPlaceholderText('placeholder.search')
    ).toBeInTheDocument();
  });

  it('shows the search icon', () => {
    render(<SearchInput keySearch="" setKeySearch={jest.fn()} />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchInput keySearch="" setKeySearch={jest.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'shoes' } });
    expect(input).toHaveValue('shoes');
  });

  it('calls setKeySearch on Enter key', () => {
    const setKeySearch = jest.fn();
    render(<SearchInput keySearch="" setKeySearch={setKeySearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'shoes' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(setKeySearch).toHaveBeenCalledWith('shoes');
  });

  it('does not call setKeySearch on Enter if input is empty', () => {
    const setKeySearch = jest.fn();
    render(<SearchInput keySearch="" setKeySearch={setKeySearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(setKeySearch).not.toHaveBeenCalled();
  });
});
