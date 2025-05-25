import client from './request';
import { BlogResponse } from '../../interfaces/blog/BlogResponse';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { Pageable } from '../../interfaces/common/Pageable';

// Fetch all blogs
export const getAllBlogs = async (
  page: number = 0,
  size: number = 10,
  sort?: string[],
  keysearch?: string
): Promise<CustomResponse<Pageable<BlogResponse[]>>> => {
  // Build query parameters
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  if (sort && sort.length) {
    sort.forEach((sortParam) => params.append('sort', sortParam));
  }

  if (keysearch) {
    params.append('keysearch', keysearch);
  }

  const response = await client.get<CustomResponse<Pageable<BlogResponse[]>>>(
    `/blogs?${params.toString()}`
  );
  return response.data;
};

// Fetch a blog by ID
export const getBlogById = async (
  id: string
): Promise<CustomResponse<BlogResponse>> => {
  const response = await client.get<CustomResponse<BlogResponse>>(
    `/blogs/${id}`
  );
  return response.data;
};
