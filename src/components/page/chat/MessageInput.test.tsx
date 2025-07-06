import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from './MessageInput';

// Mock useSelector to control userInfo
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockUserInfo = { photo: 'https://example.com/avatar.jpg' };
import { useSelector as mockUseSelectorRaw } from 'react-redux';
const mockUseSelector = mockUseSelectorRaw as unknown as jest.Mock;

describe('MessageInput', () => {
  beforeEach(() => {
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ auth: { userInfo: mockUserInfo } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input, avatar, and send button', () => {
    render(<MessageInput onSendMessage={jest.fn()} />);
    expect(screen.getByPlaceholderText('Type something')).toBeInTheDocument();
    expect(screen.getByAltText('Your avatar')).toHaveAttribute('src', mockUserInfo.photo);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('enables send button when input is not empty', () => {
    render(<MessageInput onSendMessage={jest.fn()} />);
    const input = screen.getByPlaceholderText('Type something');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls onSendMessage and clears input on submit', () => {
    const onSendMessage = jest.fn();
    render(<MessageInput onSendMessage={onSendMessage} />);
    const input = screen.getByPlaceholderText('Type something');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button'));
    expect(onSendMessage).toHaveBeenCalledWith('Hello');
    expect(input).toHaveValue('');
  });

  it('shows placeholder avatar if userInfo.photo is missing', () => {
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ auth: { userInfo: undefined } })
    );
    render(<MessageInput onSendMessage={jest.fn()} />);
    expect(screen.getByAltText('Your avatar')).toHaveAttribute(
      'src',
      expect.stringContaining('/placeholder.svg')
    );
  });
});