import { renderHook, act } from '@testing-library/react';
import * as categoryApis from '../../services/apis/category';
import { useCategory } from '../category';

jest.mock('../../services/apis/category', () => ({
  getAllCategories: jest.fn(),
  getAllCategoriesWithoutPagination: jest.fn(),
  getCategoryById: jest.fn(),
}));

describe('useCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCategories should call getAllCategories and return pageable data', async () => {
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
          name: 'Category 1',
          description: 'desc',
          createdAt: '2023-01-01',
          createdBy: 'admin',
          updatedAt: '2023-01-02',
          updatedBy: 'admin',
        },
      ],
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    (categoryApis.getAllCategories as jest.Mock).mockResolvedValueOnce({
      data: mockPageable,
    });

    const { result } = renderHook(() => useCategory());
    let res: any;
    await act(async () => {
      res = await result.current.fetchCategories(0, 10, ['createdAt,desc']);
    });

    expect(categoryApis.getAllCategories).toHaveBeenCalledWith(0, 10, [
      'createdAt,desc',
    ]);
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });

  it('fetchAllCategories should call getAllCategoriesWithoutPagination and return data', async () => {
    const mockCategories = [
      {
        id: '1',
        name: 'Category 1',
        description: 'desc',
        createdAt: '2023-01-01',
        createdBy: 'admin',
        updatedAt: '2023-01-02',
        updatedBy: 'admin',
      },
    ];
    (
      categoryApis.getAllCategoriesWithoutPagination as jest.Mock
    ).mockResolvedValueOnce({ data: mockCategories });

    const { result } = renderHook(() => useCategory());
    let res: any;
    await act(async () => {
      res = await result.current.fetchAllCategories();
    });

    expect(categoryApis.getAllCategoriesWithoutPagination).toHaveBeenCalled();
    expect(res).toEqual(mockCategories);
    expect(result.current.loading).toBe(false);
  });

  it('fetchCategoryById should call getCategoryById and return category', async () => {
    const mockCategory = {
      id: '1',
      name: 'Category 1',
      description: 'desc',
      createdAt: '2023-01-01',
      createdBy: 'admin',
      updatedAt: '2023-01-02',
      updatedBy: 'admin',
    };
    (categoryApis.getCategoryById as jest.Mock).mockResolvedValueOnce({
      data: mockCategory,
    });

    const { result } = renderHook(() => useCategory());
    let res: any;
    await act(async () => {
      res = await result.current.fetchCategoryById('1');
    });

    expect(categoryApis.getCategoryById).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockCategory);
    expect(result.current.loading).toBe(false);
  });

  it('fetchCategoryById should return null on error', async () => {
    (categoryApis.getCategoryById as jest.Mock).mockRejectedValueOnce(
      new Error('fail')
    );

    const { result } = renderHook(() => useCategory());
    let res: any;
    await act(async () => {
      res = await result.current.fetchCategoryById('1');
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
