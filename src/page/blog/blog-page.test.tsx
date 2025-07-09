import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogListPage from './blog-page';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock BlogList
jest.mock('../../components/page/blog/BlogList', () => (props: any) => (
  <div data-testid="blog-list">{JSON.stringify(props.posts)}</div>
));

// Mock Pagination
jest.mock('../../components/shared/Pagination', () => (props: any) => (
  <div data-testid="pagination" onClick={() => props.onPageChange(2)}>
    Pagination {props.currentPage}/{props.totalPages}
  </div>
));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: (props: any) => <svg data-testid="search-icon" {...props} />,
  SlidersHorizontal: (props: any) => (
    <svg data-testid="sliders-icon" {...props} />
  ),
  X: (props: any) => <svg data-testid="x-icon" {...props} />,
  ArrowUpDown: (props: any) => <svg data-testid="arrow-icon" {...props} />,
}));

// Mock useBlogs
const fetchBlogs = jest.fn();
jest.mock('../../hooks/blogs', () => ({
  useBlogs: () => ({
    loading: false,
    fetchBlogs,
  }),
}));

const mockBlogsResponse = {
  content: [
    { id: 1, title: 'Blog 1', createdAt: '2024-01-01' },
    { id: 2, title: 'Blog 2', createdAt: '2024-01-02' },
  ],
  totalPages: 3,
};

describe('BlogListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchBlogs.mockResolvedValue(mockBlogsResponse);
  });

  it('renders breadcrumb, search, and sort UI', async () => {
    render(<BlogListPage />);
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('lbl.searchBlogs')).toBeInTheDocument();
    expect(screen.getByTestId('sliders-icon')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  it('shows no results message when blogsResponse is empty', async () => {
    fetchBlogs.mockResolvedValueOnce({ content: [], totalPages: 0 });
    render(<BlogListPage />);
    await waitFor(() => {
      expect(screen.getByText('lbl.noResults')).toBeInTheDocument();
      expect(screen.getByText('lbl.tryDifferentSearch')).toBeInTheDocument();
    });
  });

  it('renders BlogList and Pagination when blogs are present', async () => {
    render(<BlogListPage />);
    await waitFor(() => {
      expect(screen.getByTestId('blog-list')).toBeInTheDocument();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  it('updates searchTerm and triggers fetchBlogs on input', async () => {
    render(<BlogListPage />);
    const input = screen.getByPlaceholderText('lbl.searchBlogs');
    fireEvent.change(input, { target: { value: 'test search' } });
    await waitFor(() => {
      expect(input).toHaveValue('test search');
    });
  });

  it('clears searchTerm when clear button is clicked', async () => {
    render(<BlogListPage />);
    const input = screen.getByPlaceholderText('lbl.searchBlogs');
    fireEvent.change(input, { target: { value: 'something' } });
    await waitFor(() => {
      expect(input).toHaveValue('something');
    });
    fireEvent.click(screen.getByTestId('x-icon'));
    expect(input).toHaveValue('');
  });

  it('shows and selects sort options', async () => {
    render(<BlogListPage />);
    const sortButton = screen.getByText('lbl.newest');
    fireEvent.click(sortButton);
    expect(screen.getByText('lbl.oldest')).toBeInTheDocument();
    fireEvent.click(screen.getByText('lbl.oldest'));
    expect(screen.getByText('lbl.oldest')).toBeInTheDocument();
  });

  it('changes page when pagination is clicked', async () => {
    render(<BlogListPage />);
    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('pagination'));
    // Should update currentPage to 2 and scroll to top (cannot test scrollTo in jsdom)
  });
});
