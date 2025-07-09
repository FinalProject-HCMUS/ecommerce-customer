import * as reviewApis from '../reviewApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;
const mockPost = client.post as jest.Mock;

describe('reviewApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllReviews should call client.get with correct query params and return data', async () => {
    const mockReview = {
      id: 'r1',
      comment: 'Great!',
      headline: 'Awesome',
      rating: 5,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      orderDetailId: 'od1',
      userName: 'John',
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
      content: [mockReview],
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

    const res = await reviewApis.getAllReviews(
      0,
      10,
      ['createdAt,desc'],
      'search',
      4,
      5,
      'od1',
      'p1'
    );
    expect(mockGet).toHaveBeenCalledWith(
      '/reviews?page=0&size=10&sort=createdAt%2Cdesc&keyword=search&minRating=4&maxRating=5&orderDetailId=od1&productId=p1'
    );
    expect(res).toEqual(mockResponse);
  });

  it('createReview should call client.post with correct args and return data', async () => {
    const req = {
      comment: 'Nice product',
      headline: 'Good',
      rating: 5,
      orderDetailId: 'od1',
      userName: 'Jane',
    };
    const mockReview = {
      id: 'r2',
      ...req,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockReview,
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const res = await reviewApis.createReview(req);
    expect(mockPost).toHaveBeenCalledWith('/reviews', req);
    expect(res).toEqual(mockResponse);
  });
});
