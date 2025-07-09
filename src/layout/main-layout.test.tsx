import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './main-layout';

// Mock the dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet-component">Outlet Content</div>,
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => (
    <div data-testid="toast-container">Toast Container</div>
  ),
}));

jest.mock('../components/layout/Navbar', () => () => (
  <div data-testid="navbar-component">Navbar Component</div>
));

jest.mock('../components/layout/Footer', () => () => (
  <div data-testid="footer-component">Footer Component</div>
));

describe('MainLayout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the layout with all components', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    // Verify the main container exists with correct classes
    const container = screen.getByTestId('navbar-component').parentElement;
    expect(container).toHaveClass('min-h-screen bg-white');

    // Verify all components are rendered
    expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
    expect(screen.getByTestId('outlet-component')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('should be wrapped in a div with the correct classes', () => {
    const { container } = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('bg-white');
  });
});
