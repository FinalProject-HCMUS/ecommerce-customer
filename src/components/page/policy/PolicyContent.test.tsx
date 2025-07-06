import { render, screen } from '@testing-library/react';
import PolicyContent from './PolicyContent';

// Mock policy data
jest.mock('../../../locales/en/shopData.json', () => ({
  policy: [
    { title: 'Policy 1', content: 'Content 1' },
    { title: 'Policy 2', content: 'Content 2' },
  ],
}), { virtual: true });

// Mock PolicySection
jest.mock('./PolicySection', () => (props: any) => (
  <div data-testid="policy-section">{`Section ${props.index}`}</div>
));

describe('PolicyContent', () => {
  it('renders the title', () => {
    render(<PolicyContent title="Privacy Policy" />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders a PolicySection for each policy item', () => {
    render(<PolicyContent title="Test Policy" />);
    const sections = screen.getAllByTestId('policy-section');
    expect(sections).toHaveLength(2);
    expect(sections[0]).toHaveTextContent('Section 0');
    expect(sections[1]).toHaveTextContent('Section 1');
  });
});