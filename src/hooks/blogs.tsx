import { useState } from 'react'
import { BlogResponse } from '../interfaces/blog/BlogResponse'
import { getAllBlogs, getBlogById } from '../services/apis/blogApis'

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogResponse[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await getAllBlogs()
      setBlogs(response.data || [])
    } catch {
      setBlogs([])
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
    blogs,
    loading,
    fetchBlogs,
    fetchBlogById,
  }
}
