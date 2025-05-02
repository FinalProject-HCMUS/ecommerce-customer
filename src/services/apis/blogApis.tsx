import client from './request'
import { BlogResponse } from '../../interfaces/blog/BlogResponse'
import { CustomResponse } from '../../interfaces/common/CustomResponse'
import { Pageable } from '../../interfaces/common/Pageable'

// Fetch all blogs
export const getAllBlogs = async (
  size: number,
  pageSize: number,
): Promise<CustomResponse<Pageable<BlogResponse[]>>> => {
  const response = await client.get<CustomResponse<Pageable<BlogResponse[]>>>(`/blogs?page=${size}&size=${pageSize}`)
  return response.data
}

// Fetch a blog by ID
export const getBlogById = async (id: string): Promise<CustomResponse<BlogResponse>> => {
  const response = await client.get<CustomResponse<BlogResponse>>(`/blogs/${id}`)
  return response.data
}
