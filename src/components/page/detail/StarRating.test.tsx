import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Star: (props: any) => <svg data-testid="star" {...props} />,
  StarHalf: (props: any) => <svg data-testid="star-half" {...props} />,
}));

describe('StarRating', () => {
  it('renders 5 empty stars for 0 rating', () => {
    render(<StarRating rating={0} />);
    expect(screen.getAllByTestId('star')).toHaveLength(5);
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument();
  });

  it('renders correct number of full, half, and empty stars', () => {
    render(<StarRating rating={3.5} />);
    // 3 full, 1 half, 1 empty
    expect(screen.getAllByTestId('star')).toHaveLength(4); // 3 full + 1 empty
    expect(screen.getByTestId('star-half')).toBeInTheDocument();
  });

  it('renders all full stars for integer rating', () => {
    render(<StarRating rating={5} />);
    expect(screen.getAllByTestId('star')).toHaveLength(5);
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument();
  });

  it('shows score text when showScore is true', () => {
    render(<StarRating rating={4.2} showScore />);
    expect(screen.getByText('4.2/5')).toBeInTheDocument();
  });

  it('applies correct text size for score', () => {
    render(<StarRating rating={4.2} showScore size="sm" />);
    const score = screen.getByText('4.2/5');
    expect(score.className).toMatch(/text-xs/);
  });
});
