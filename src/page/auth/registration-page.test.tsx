import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Registration from './registration-page';

// Mock the child components
jest.mock('../../components/page/auth/registration/ShopInfo', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-shop-info">Shop Info Component</div>,
}));

jest.mock('../../components/page/auth/registration/RegistrationForm', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-registration-form">Registration Form Component</div>
  ),
}));

describe('Registration Page', () => {
  test('renders without errors', () => {
    render(<Registration />);

    // Verify both components are rendered
    expect(screen.getByTestId('mock-shop-info')).toBeInTheDocument();
    expect(screen.getByTestId('mock-registration-form')).toBeInTheDocument();
  });

  test('renders with correct container structure', () => {
    const { container } = render(<Registration />);

    // Check the main container
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass(
      'flex',
      'mt-20',
      'my-8',
      'mx-8',
      'flex-col',
      'md:flex-row',
      'min-h-screen'
    );

    // Check component order
    const children = Array.from(mainContainer?.childNodes || []);
    expect(children.length).toBe(2);
    expect(children[0]).toHaveTextContent('Shop Info Component');
    expect(children[1]).toHaveTextContent('Registration Form Component');
  });

  test('correctly positions ShopInfo and RegistrationForm components', () => {
    render(<Registration />);

    // Get the components
    const shopInfo = screen.getByTestId('mock-shop-info');
    const registrationForm = screen.getByTestId('mock-registration-form');

    // Verify they are siblings
    expect(shopInfo.parentElement).toBe(registrationForm.parentElement);

    // Check the order (ShopInfo comes first)
    const parent = shopInfo.parentElement;
    const children = Array.from(parent?.childNodes || []);
    expect(children.indexOf(shopInfo)).toBeLessThan(
      children.indexOf(registrationForm)
    );
  });

  test('matches snapshot', () => {
    const { container } = render(<Registration />);
    expect(container).toMatchSnapshot();
  });
});
