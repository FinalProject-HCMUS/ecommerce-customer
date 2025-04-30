import BlogDetail from '../../components/page/blog/BlogDetail'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useBlogs } from '../../hooks/blogs'
import { BlogResponse } from '../../interfaces'

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { fetchBlogById, loading } = useBlogs()
  const [post, setPost] = useState<BlogResponse | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const fetchedPost = await fetchBlogById(id)
        setPost(fetchedPost)
      }
    }

    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading post...</div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto mt-10 mx-8 px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return <BlogDetail post={post} />
}

export default BlogDetailPage
