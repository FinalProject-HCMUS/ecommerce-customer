import { renderHook, act } from '@testing-library/react';
import * as sizeApis from '../../services/apis/sizeApis';
import { useSizes } from '../size';

jest.mock('../../services/apis/sizeApis', () => ({
  getAllSizes: jest.fn(),
  getSizeById: jest.fn(),
}));

describe('useSizes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchAllSizes should call getAllSizes and return pageable data', async () => {
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
          name: 'M',
          minHeight: 160,
          maxHeight: 170,
          minWeight: 50,
          maxWeight: 60,
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
    (sizeApis.getAllSizes as jest.Mock).mockResolvedValueOnce({ data: mockPageable });

    const { result } = renderHook(() => useSizes());
    let res: any;
    await act(async () => {
      res = await result.current.fetchAllSizes();
    });

    expect(sizeApis.getAllSizes).toHaveBeenCalled();
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });



  it('fetchSizeById should call getSizeById and return pageable data', async () => {
    const mockPageable = {
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 1,
        unpaged: false,
        offset: 0,
        sort: { sorted: false, unsorted: true, empty: true },
      },
      numberOfElements: 1,
      size: 1,
      content: {
        id: '1',
        name: 'L',
        minHeight: 170,
        maxHeight: 180,
        minWeight: 60,
        maxWeight: 70,
        createdAt: '2023-01-01',
        createdBy: 'admin',
        updatedAt: '2023-01-02',
        updatedBy: 'admin',
      },
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    (sizeApis.getSizeById as jest.Mock).mockResolvedValueOnce({ data: mockPageable });

    const { result } = renderHook(() => useSizes());
    let res: any;
    await act(async () => {
      res = await result.current.fetchSizeById('1');
    });

    expect(sizeApis.getSizeById).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });
});