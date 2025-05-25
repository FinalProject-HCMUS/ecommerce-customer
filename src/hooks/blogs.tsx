import { useState } from 'react';
import { BlogResponse } from '../interfaces/blog/BlogResponse';
import { getAllBlogs, getBlogById } from '../services/apis/blogApis';
import { Pageable } from '../interfaces/common/Pageable';

export const useBlogs = () => {
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (
    page: number = 0,
    size: number = 10,
    sort?: string[],
    keysearch?: string
  ): Promise<Pageable<BlogResponse[]> | null> => {
    setLoading(true);
    try {
      const response = await getAllBlogs(page, size, sort, keysearch);

      if (response.isSuccess && response.data) {
        return response.data;
      } else {
        return null;
      }
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single blog by ID
  const fetchBlogById = async (id: string): Promise<BlogResponse | null> => {
    setLoading(true);
    try {
      const response = await getBlogById(id);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchBlogs,
    fetchBlogById,
  };
};
