import {
  getAllCategories,
  getAllCategoriesWithoutPagination,
  getCategoryById,
} from '../category';
import client from '../request';

// Mock helper env (if needed)
jest.mock('../../../helpers/env', () => ({
  VITE_BACKEND_URL: 'http://localhost/api',
}));

jest.mock('../request');

describe('category apis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllCategories should call client.get with correct URL and return data', async () => {
    const mockData = {
      timestamp: '2024-07-06T12:00:00Z',
      httpStatus: 'OK',
      isSuccess: true,
      data: {
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
            id: 'cat1',
            name: 'Category 1',
            description: 'desc',
            createdAt: '2024-07-06T12:00:00Z',
            createdBy: 'admin',
            updatedAt: '2024-07-06T12:00:00Z',
            updatedBy: 'admin',
          },
        ],
        number: 0,
        sort: { sorted: false, unsorted: true, empty: true },
        empty: false,
      },
    };
    (client.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getAllCategories(0, 10, ['name,asc']);
    expect(client.get).toHaveBeenCalledWith('/categories?page=0&size=10&sort=name,asc');
    expect(result).toEqual(mockData);
  });

  it('getAllCategoriesWithoutPagination should call client.get with correct URL and return data', async () => {
    const mockData = {
      timestamp: '2024-07-06T12:00:00Z',
      httpStatus: 'OK',
      isSuccess: true,
      data: [
        {
          id: 'cat1',
          name: 'Category 1',
          description: 'desc',
          createdAt: '2024-07-06T12:00:00Z',
          createdBy: 'admin',
          updatedAt: '2024-07-06T12:00:00Z',
          updatedBy: 'admin',
        },
      ],
    };
    (client.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getAllCategoriesWithoutPagination();
    expect(client.get).toHaveBeenCalledWith('/categories/all');
    expect(result).toEqual(mockData);
  });

  it('getCategoryById should call client.get with correct URL and return data', async () => {
    const mockData = {
      timestamp: '2024-07-06T12:00:00Z',
      httpStatus: 'OK',
      isSuccess: true,
      data: {
        id: 'cat1',
        name: 'Category 1',
        description: 'desc',
        createdAt: '2024-07-06T12:00:00Z',
        createdBy: 'admin',
        updatedAt: '2024-07-06T12:00:00Z',
        updatedBy: 'admin',
      },
    };
    (client.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getCategoryById('cat1');
    expect(client.get).toHaveBeenCalledWith('/categories/cat1');
    expect(result).toEqual(mockData);
  });

  it('should throw error if client.get rejects', async () => {
    (client.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    await expect(getAllCategories()).rejects.toThrow('Network error');
    await expect(getAllCategoriesWithoutPagination()).rejects.toThrow('Network error');
    await expect(getCategoryById('cat1')).rejects.toThrow('Network error');
  });
});