import client from './request';
import { BlogResponse } from '../../interfaces/blog/BlogResponse';
import { CustomResponse } from '../../interfaces/common/CustomResponse';

// Fetch all blogs
export const getAllBlogs = async (): Promise<CustomResponse<BlogResponse[]>> => {
  const response = await client.get<CustomResponse<BlogResponse[]>>('/blogs');
  return response.data;
};

// Fetch a blog by ID
export const getBlogById = async (id: string): Promise<CustomResponse<BlogResponse>> => {
  const response = await client.get<CustomResponse<BlogResponse>>(`/blogs/${id}`);
  return response.data;
};
