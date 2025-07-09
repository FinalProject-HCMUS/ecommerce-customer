import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';

// Mock StarRating, t, and formatDateUtils
jest.mock('../../shared/RatingStars', () => (props: any) => (
  <div data-testid="star-rating">{props.rating}</div>
));
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));
jest.mock('../../../utils', () => ({
  formatDateUtils: {
    formatDate: (date: string) => `formatted-${date}`,
  },
}));

describe('ReviewCard', () => {
  it('renders author, rating, content, and formatted date', () => {
    render(
      <ReviewCard
        author="Alice"
        rating={4}
        content="Great product!"
        date="2024-07-01"
      />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating')).toHaveTextContent('4');
    expect(screen.getByText('Great product!')).toBeInTheDocument();
    expect(screen.getByText(/lbl.postOn/)).toBeInTheDocument();
    expect(screen.getByText(/formatted-2024-07-01/)).toBeInTheDocument();
  });

  it('shows verified badge if isVerified is true', () => {
    render(
      <ReviewCard
        author="Bob"
        rating={5}
        content="Verified review"
        date="2024-07-02"
        isVerified={true}
      />
    );
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('does not show verified badge if isVerified is false', () => {
    render(
      <ReviewCard
        author="Charlie"
        rating={3}
        content="Not verified"
        date="2024-07-03"
        isVerified={false}
      />
    );
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });
});