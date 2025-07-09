import { render, screen, waitFor } from '@testing-library/react';
import DetailBlogPage from './detail-blog-page';
import * as ReactRouterDom from 'react-router-dom';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock BlogDetail
jest.mock('../../components/page/blog/BlogDetail', () => (props: any) => (
  <div data-testid="blog-detail">{JSON.stringify(props.post)}</div>
));

// Mock Loading
jest.mock('../../components/shared/Loading', () => () => (
  <div data-testid="loading" />
));

// Mock Link and useParams
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Link: (props: any) => <a {...props} />,
    useParams: jest.fn(),
  };
});

// Mock useBlogs
const fetchBlogById = jest.fn();
jest.mock('../../hooks/blogs', () => ({
  useBlogs: () => ({
    fetchBlogById,
    loading: false,
  }),
}));

describe('DetailBlogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders not found message when no post', async () => {
    fetchBlogById.mockResolvedValueOnce(null);
    jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ id: '1' });
    render(<DetailBlogPage />);
    await waitFor(() => {
      expect(screen.getByText('error.blogNotFound')).toBeInTheDocument();
      expect(screen.getByText('error.blogNotFoundText')).toBeInTheDocument();
      expect(screen.getByText('btn.backToHome')).toBeInTheDocument();
    });
  });

  it('renders BlogDetail when post is found', async () => {
    const post = { id: '1', title: 'Blog Title', content: 'Content' };
    fetchBlogById.mockResolvedValueOnce(post);
    jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ id: '1' });
    render(<DetailBlogPage />);
    await waitFor(() => {
      expect(screen.getByTestId('blog-detail')).toHaveTextContent('Blog Title');
    });
  });
});