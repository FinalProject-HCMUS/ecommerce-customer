import React, { useEffect, useState } from 'react'
import BlogList from '../../components/page/blog/BlogList'
import Breadcrumb from '../../components/shared/Breadcrumb'
import Pagination from '../../components/shared/Pagination'
import { useBlogs } from '../../hooks/blogs'
import { t } from '../../helpers/i18n'
import { BLOG_PER_PAGE } from '../../constants/common'
import { BlogResponse } from '../../interfaces/blog/BlogResponse'
import { Pageable } from '../../interfaces/common/Pageable'

const BlogListPage: React.FC = () => {
  const { loading, fetchBlogs } = useBlogs()
  const [blogsResponse, setBlogsResponse] = useState<Pageable<BlogResponse[]> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBlogs(0, BLOG_PER_PAGE)
      if (res) {
        setBlogsResponse(res)
      }
    }
    fetchData()
  }, [])

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    // Scroll to top when changing pages
    const res = await fetchBlogs(pageNumber - 1, BLOG_PER_PAGE)
    if (res) {
      setBlogsResponse(res)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 mx-10 px-4 py-8">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.blog'), path: '/blog' },
        ]}
      />

      <main className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">{t('lbl.loading')}</div>
          </div>
        ) : (
          <>
            <BlogList posts={blogsResponse?.content} />
            <Pagination
              currentPage={1 + (blogsResponse?.pageable?.pageNumber ?? 0)}
              totalPages={blogsResponse?.totalPages || 0}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default BlogListPage
