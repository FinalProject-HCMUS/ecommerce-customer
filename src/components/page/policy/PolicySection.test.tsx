import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PolicySection from './PolicySection';

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode, className: string }) => (
      <div data-testid="motion-div" className={className}>
        {children}
      </div>
    ),
  },
}));

// Mock the i18n translation function
jest.mock('../../../helpers/i18n', () => ({
  t: jest.fn((key: string) => {
    // Mock translation responses based on the key
    const translations: Record<string, string> = {
      'policy.0.title': 'Returns Policy',
      'policy.0.content': 'Our returns policy allows returns within 30 days of purchase.',
      'policy.1.title': 'Privacy Policy',
      'policy.1.content': 'We respect your privacy and protect your data.',
      'policy.2.title': 'Terms of Service',
      'policy.2.content': 'By using our service, you agree to these terms.',
    };
    return translations[key] || key;
  }),
}));

describe('PolicySection', () => {
  test('renders policy section with index 0', () => {
    render(<PolicySection index={0} />);
    
    // Check that the title and content are rendered correctly
    expect(screen.getByText('Returns Policy')).toBeInTheDocument();
    expect(screen.getByText('Our returns policy allows returns within 30 days of purchase.')).toBeInTheDocument();
    
    // Check that the container has the correct class
    const container = screen.getByTestId('motion-div');
    expect(container).toHaveClass('mb-6');
  });
  
  test('renders policy section with index 1', () => {
    render(<PolicySection index={1} />);
    
    // Check that the title and content are rendered correctly
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('We respect your privacy and protect your data.')).toBeInTheDocument();
  });
  
  test('renders policy section with index 2', () => {
    render(<PolicySection index={2} />);
    
    // Check that the title and content are rendered correctly
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('By using our service, you agree to these terms.')).toBeInTheDocument();
  });
  
  test('renders policy section with non-existent index', () => {
    render(<PolicySection index={999} />);
    
    // When translation keys don't exist, the keys themselves should be rendered
    expect(screen.getByText('policy.999.title')).toBeInTheDocument();
    expect(screen.getByText('policy.999.content')).toBeInTheDocument();
  });
  
  test('applies correct heading styles', () => {
    render(<PolicySection index={0} />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-xl', 'font-semibold', 'mb-2');
  });
  
  test('applies correct paragraph styles', () => {
    render(<PolicySection index={0} />);
    
    const paragraph = screen.getByText('Our returns policy allows returns within 30 days of purchase.');
    expect(paragraph).toHaveClass('text-gray-700');
  });
  
  test('matches snapshot', () => {
    const { container } = render(<PolicySection index={0} />);
    expect(container).toMatchSnapshot();
  });
});