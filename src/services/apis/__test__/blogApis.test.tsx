import { BlogResponse } from '../../../interfaces';
import * as blogApis from '../blogApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;

describe('blogApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllBlogs should call client.get with correct query params and return data', async () => {
    const mockBlog: BlogResponse = {
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
      content: [mockBlog],
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockPageable,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await blogApis.getAllBlogs(0, 10, ['createdAt,desc'], 'search');
    expect(mockGet).toHaveBeenCalledWith(
      '/blogs?page=0&size=10&sort=createdAt%2Cdesc&keysearch=search'
    );
    expect(res).toEqual(mockResponse);
  });

  it('getBlogById should call client.get with correct url and return data', async () => {
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
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockBlog,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await blogApis.getBlogById('1');
    expect(mockGet).toHaveBeenCalledWith('/blogs/1');
    expect(res).toEqual(mockResponse);
  });
});
