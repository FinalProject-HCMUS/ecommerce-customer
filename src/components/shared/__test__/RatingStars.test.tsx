import { render, screen } from '@testing-library/react';
import RatingStars from '../RatingStars';

// Mock StarIcon to simplify assertions
jest.mock('../../../icon/icon', () => ({
  StarIcon: ({ filled, half }: { filled: boolean; half?: boolean }) => (
    <span data-testid={half ? 'half-star' : filled ? 'full-star' : 'empty-star'} />
  ),
}));

describe('RatingStars', () => {
  it('renders correct number of full, half, and empty stars', () => {
    render(<RatingStars rating={3.5} />);
    expect(screen.getAllByTestId('full-star')).toHaveLength(3);
    expect(screen.getAllByTestId('half-star')).toHaveLength(1);
    expect(screen.getAllByTestId('empty-star')).toHaveLength(1);
  });

  it('renders only full stars when rating is integer', () => {
    render(<RatingStars rating={4} />);
    expect(screen.getAllByTestId('full-star')).toHaveLength(4);
    expect(screen.queryByTestId('half-star')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('empty-star')).toHaveLength(1);
  });

  it('renders all empty stars when rating is 0', () => {
    render(<RatingStars rating={0} />);
    expect(screen.queryByTestId('full-star')).not.toBeInTheDocument();
    expect(screen.queryByTestId('half-star')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('empty-star')).toHaveLength(5);
  });

  it('shows text by default', () => {
    render(<RatingStars rating={2.5} />);
    expect(screen.getByText('2.5/5')).toBeInTheDocument();
  });

  it('hides text when showText is false', () => {
    render(<RatingStars rating={2.5} showText={false} />);
    expect(screen.queryByText('2.5/5')).not.toBeInTheDocument();
  });

  it('supports custom maxRating', () => {
    render(<RatingStars rating={7} maxRating={10} />);
    expect(screen.getAllByTestId('full-star')).toHaveLength(7);
    expect(screen.getAllByTestId('empty-star')).toHaveLength(3);
    expect(screen.getByText('7/10')).toBeInTheDocument();
  });
});