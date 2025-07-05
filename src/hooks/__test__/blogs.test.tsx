import { renderHook, act } from '@testing-library/react';
import * as blogApis from '../../services/apis/blogApis';
import { useBlogs } from '../blogs';

jest.mock('../../services/apis/blogApis', () => ({
  getAllBlogs: jest.fn(),
  getBlogById: jest.fn(),
}));

describe('useBlogs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchBlogs should call getAllBlogs and return pageable data', async () => {
    const mockPageable = {
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 10,
        unpaged: false,
        offset: 0,
        sort: { sorted: false, unsorted: true, empty: true },
      },
      numberOfElements: 1,
      size: 10,
      content: [
        {
          id: '1',
          title: 'Blog Title',
          content: 'Blog Content',
          image: 'img.png',
          userId: 'u1',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-02',
          createdBy: 'admin',
          updatedBy: 'admin',
        },
      ],
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    (blogApis.getAllBlogs as jest.Mock).mockResolvedValueOnce({
      isSuccess: true,
      data: mockPageable,
    });

    const { result } = renderHook(() => useBlogs());
    let res: any;
    await act(async () => {
      res = await result.current.fetchBlogs(0, 10, ['createdAt,desc'], 'search');
    });

    expect(blogApis.getAllBlogs).toHaveBeenCalledWith(0, 10, ['createdAt,desc'], 'search');
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });

  it('fetchBlogs should return null if not success', async () => {
    (blogApis.getAllBlogs as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
      data: null,
    });

    const { result } = renderHook(() => useBlogs());
    let res: any;
    await act(async () => {
      res = await result.current.fetchBlogs();
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetchBlogs should return null on error', async () => {
    (blogApis.getAllBlogs as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useBlogs());
    let res: any;
    await act(async () => {
      res = await result.current.fetchBlogs();
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetchBlogById should call getBlogById and return blog data', async () => {
    const mockBlog = {
      id: '1',
      title: 'Blog Title',
      content: 'Blog Content',
      image: 'img.png',
      userId: 'u1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      createdBy: 'admin',
      updatedBy: 'admin',
    };
    (blogApis.getBlogById as jest.Mock).mockResolvedValueOnce({
      data: mockBlog,
    });

    const { result } = renderHook(() => useBlogs());
    let res: any;
    await act(async () => {
      res = await result.current.fetchBlogById('1');
    });

    expect(blogApis.getBlogById).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockBlog);
    expect(result.current.loading).toBe(false);
  });

  it('fetchBlogById should return null on error', async () => {
    (blogApis.getBlogById as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useBlogs());
    let res: any;
    await act(async () => {
      res = await result.current.fetchBlogById('1');
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});