import { renderHook, act } from '@testing-library/react';
import * as colorApis from '../../services/apis/colorApis';
import { useColors } from '../color';

jest.mock('../../services/apis/colorApis', () => ({
  getAllColors: jest.fn(),
  getColorById: jest.fn(),
}));

describe('useColors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchAllColors should call getAllColors and return pageable data', async () => {
    const mockPageable = {
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 100,
        unpaged: false,
        offset: 0,
        sort: { sorted: false, unsorted: true, empty: true },
      },
      numberOfElements: 1,
      size: 100,
      content: [
        {
          id: '1',
          name: 'Red',
          code: '#FF0000',
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
    (colorApis.getAllColors as jest.Mock).mockResolvedValueOnce({ data: mockPageable });

    const { result } = renderHook(() => useColors());
    let res: any;
    await act(async () => {
      res = await result.current.fetchAllColors();
    });

    expect(colorApis.getAllColors).toHaveBeenCalled();
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });

  it('fetchColorById should call getColorById and return pageable data', async () => {
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
      content: [
        {
          id: '1',
          name: 'Red',
          code: '#FF0000',
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
    (colorApis.getColorById as jest.Mock).mockResolvedValueOnce({ data: mockPageable });

    const { result } = renderHook(() => useColors());
    let res: any;
    await act(async () => {
      res = await result.current.fetchColorById('1');
    });

    expect(colorApis.getColorById).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });

});