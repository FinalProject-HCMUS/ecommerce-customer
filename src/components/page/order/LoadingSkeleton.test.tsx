import { render, screen } from '@testing-library/react';
import LoadingSkeleton from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders 3 skeletons by default', () => {
    render(<LoadingSkeleton />);
    // Each skeleton card has a unique key and a div with class 'bg-white'
    expect(screen.getAllByRole('presentation').length).toBe(3);
  });

  it('renders the correct number of skeletons when count is provided', () => {
    render(<LoadingSkeleton count={5} />);
    expect(screen.getAllByRole('presentation').length).toBe(5);
  });

  it('renders skeleton structure', () => {
    const { container } = render(<LoadingSkeleton />);
    // Check for some skeleton elements by class
    expect(
      container.getElementsByClassName('animate-pulse').length
    ).toBeGreaterThan(0);
    expect(
      container.getElementsByClassName('bg-gray-300').length
    ).toBeGreaterThan(0);
  });
});
