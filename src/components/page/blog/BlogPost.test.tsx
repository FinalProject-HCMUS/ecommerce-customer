import { render, screen } from '@testing-library/react';
import BlogPost from './BlogPost';

// Mock react-router-dom Link
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));

// Mock formatDate
jest.mock('../../../utils/formatDate', () => ({
  formatDate: (date: string) => `formatted-${date}`,
}));

const mockPost = {
  id: '1',
  title: 'Blog Title',
  content: '<p>Hello <b>world</b>!</p>',
  image: 'https://example.com/image.jpg',
  userId: 'user1',
  createdAt: '2024-07-01T00:00:00Z',
  updatedAt: '2024-07-02T00:00:00Z',
  createdBy: 'user1',
  updatedBy: 'user2',
};

describe('BlogPost', () => {
  it('renders blog title, content preview, and image', () => {
    render(<BlogPost post={mockPost} index={0} />);
    expect(screen.getByText('Blog Title')).toBeInTheDocument();
    expect(screen.getByText('Hello world!')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /blog title/i })).toHaveAttribute('src', mockPost.image);
    expect(screen.getByText('formatted-2024-07-01T00:00:00Z')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /blog title/i })[0]).toHaveAttribute('href', '/blog/1');
  });

});