import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import CozeChat from './CozeChat';

// Mock the dependencies
jest.mock('react-router-dom', () => ({
  RouterProvider: jest.fn(() => (
    <div data-testid="router-provider">Router Provider</div>
  )),
}));

jest.mock('./router/index', () => ({
  __esModule: true,
  default: 'mock-router',
}));

jest.mock('./CozeChat', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="coze-chat">Coze Chat Component</div>
  )),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both CozeChat and RouterProvider', () => {
    render(<App />);

    // Check that CozeChat component is rendered
    expect(screen.getByTestId('coze-chat')).toBeInTheDocument();
    expect(CozeChat).toHaveBeenCalled();

    // Check that RouterProvider is rendered with correct router
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
    expect(RouterProvider).toHaveBeenCalledWith(
      expect.objectContaining({ router: 'mock-router' }),
      expect.anything()
    );
  });

  it('renders components in correct order', () => {
    render(<App />);

    const elements = screen.getAllByTestId(/coze-chat|router-provider/);
    expect(elements.length).toBe(2);
    expect(elements[0]).toHaveAttribute('data-testid', 'coze-chat');
    expect(elements[1]).toHaveAttribute('data-testid', 'router-provider');
  });

  it('contains app fragment wrapper', () => {
    const { container } = render(<App />);
    // React fragments don't render a DOM node, but we can check that
    // the container has both direct children (CozeChat and RouterProvider)
    expect(container.firstChild).toBeInTheDocument();
    expect(container.childNodes.length).toBe(2);
  });
});
