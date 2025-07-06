import { render, screen } from '@testing-library/react';
import BlogDetail from './BlogDetail';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));
jest.mock('../../../utils', () => ({
  formatDateUtils: {
    formatDate: (date: string) => `formatted-${date}`,
  },
}));

const mockPost = {
  id: '1',
  title: 'Test Blog Title',
  content: '<p>Test blog content</p>',
  image: 'https://example.com/image.jpg',
  userId: 'user1',
  createdAt: '2024-07-01T00:00:00Z',
  updatedAt: '2024-07-02T00:00:00Z',
  createdBy: 'user1',
  updatedBy: 'user2',
};

describe('BlogDetail', () => {
  it('renders blog title, content, and image', () => {
    render(<BlogDetail post={mockPost} />);
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText('btn.backToBlog')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test blog title/i })).toHaveAttribute('src', mockPost.image);
    expect(screen.getByText('formatted-2024-07-02T00:00:00Z')).toBeInTheDocument();
    expect(screen.getByText(/Test blog content/i)).toBeInTheDocument();
  });

  it('renders placeholder image if post.image is empty', () => {
    render(<BlogDetail post={{ ...mockPost, image: '' }} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('/placeholder.svg'));
  });
});