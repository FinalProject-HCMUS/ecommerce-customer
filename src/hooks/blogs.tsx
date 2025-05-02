import { useState } from 'react'
import { BlogResponse } from '../interfaces/blog/BlogResponse'
import { getAllBlogs, getBlogById } from '../services/apis/blogApis'
import { Pageable } from '../interfaces/common/Pageable'

export const useBlogs = () => {
  const [loading, setLoading] = useState(false)

  // Fetch all blogs
  const fetchBlogs = async (page: number, pagesize: number): Promise<Pageable<BlogResponse[]> | undefined> => {
    setLoading(true)
    try {
      const response = await getAllBlogs(page, pagesize)
      return response.data
    } finally {
      setLoading(false)
    }
  }

  // Fetch a single blog by ID
  const fetchBlogById = async (id: string): Promise<BlogResponse | null> => {
    setLoading(true)
    try {
      const response = await getBlogById(id)
      return response.data || null
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    fetchBlogs,
    fetchBlogById,
  }
}
