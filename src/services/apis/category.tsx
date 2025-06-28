import { CustomResponse, Pageable, CategoryResponse } from '../../interfaces';
import client from './request';
import { common } from '../../constants';

const { CATEGORY_PER_PAGE } = common;

export const getAllCategories = async (
  page: number = 0,
  size: number = CATEGORY_PER_PAGE,
  sort?: string[]
): Promise<CustomResponse<Pageable<CategoryResponse[]>>> => {
  let url = `/categories?page=${page}&size=${size}`;

  if (sort && sort.length > 0) {
    url += `&sort=${sort.join(',')}`;
  }

  const response =
    await client.get<CustomResponse<Pageable<CategoryResponse[]>>>(url);
  return response.data;
};

export const getAllCategoriesWithoutPagination = async (): Promise<
  CustomResponse<CategoryResponse[]>
> => {
  const response =
    await client.get<CustomResponse<CategoryResponse[]>>('/categories/all');
  return response.data;
};

export const getCategoryById = async (
  id: string
): Promise<CustomResponse<CategoryResponse>> => {
  const response = await client.get<CustomResponse<CategoryResponse>>(
    `/categories/${id}`
  );
  return response.data;
};
