import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogList from './BlogList';
import { BlogResponse } from '../../../interfaces';

// Mock the child component using Jest
jest.mock('./BlogPost', () => ({
  __esModule: true,
  default: ({ post, index }: { post: BlogResponse; index: number }) => (
    <div data-testid={`blog-post-${post.id}`} data-index={index}>
      {post.title}
    </div>
  ),
}));

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className: string;
    }) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('BlogList', () => {
  // Sample blog posts for testing with complete interface matching
  const mockPosts: BlogResponse[] = [
    {
      id: '1',
      title: 'First Blog Post',
      content: '<p>This is the first blog post content</p>',
      image: 'image1.jpg',
      userId: 'user123',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      createdBy: 'John Doe',
      updatedBy: 'John Doe',
    },
    {
      id: '2',
      title: 'Second Blog Post',
      content: '<p>This is the second blog post content</p>',
      image: 'image2.jpg',
      userId: 'user456',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
      createdBy: 'Jane Smith',
      updatedBy: 'Jane Smith',
    },
    {
      id: '3',
      title: 'Third Blog Post',
      content: '<p>This is the third blog post content</p>',
      image: 'image3.jpg',
      userId: 'user789',
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-03T00:00:00Z',
      createdBy: 'Alex Johnson',
      updatedBy: 'Alex Johnson',
    },
  ];

  test('matches snapshot with populated posts', () => {
    const { container } = render(<BlogList posts={mockPosts} />);
    expect(container).toMatchSnapshot();
  });

  test('renders all blog posts when posts array is provided', () => {
    render(<BlogList posts={mockPosts} />);

    // Check if all posts are rendered
    expect(screen.getByTestId('blog-post-1')).toBeInTheDocument();
    expect(screen.getByTestId('blog-post-2')).toBeInTheDocument();
    expect(screen.getByTestId('blog-post-3')).toBeInTheDocument();

    // Check if they are rendered in correct order with correct index
    expect(screen.getByTestId('blog-post-1')).toHaveAttribute(
      'data-index',
      '0'
    );
    expect(screen.getByTestId('blog-post-2')).toHaveAttribute(
      'data-index',
      '1'
    );
    expect(screen.getByTestId('blog-post-3')).toHaveAttribute(
      'data-index',
      '2'
    );
  });

  test('renders nothing when posts array is empty', () => {
    render(<BlogList posts={[]} />);

    // Check that no posts are rendered
    expect(screen.queryByTestId(/blog-post-/)).not.toBeInTheDocument();
  });

  test('renders nothing when posts is undefined', () => {
    render(<BlogList posts={undefined} />);

    // Check that no posts are rendered
    expect(screen.queryByTestId(/blog-post-/)).not.toBeInTheDocument();
  });

  test('renders correct number of blog posts', () => {
    render(<BlogList posts={mockPosts.slice(0, 2)} />);

    // Check if only the first two posts are rendered
    expect(screen.getByTestId('blog-post-1')).toBeInTheDocument();
    expect(screen.getByTestId('blog-post-2')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-post-3')).not.toBeInTheDocument();
  });

  test('renders with proper structure', () => {
    const { container } = render(<BlogList posts={mockPosts} />);

    // Check if the main container has the correct class
    expect(container.firstChild).toHaveClass('space-y-4 mx-5');

    // Check if the correct number of children are rendered
    expect(
      container.querySelectorAll('[data-testid^="blog-post-"]').length
    ).toBe(3);
  });
});
