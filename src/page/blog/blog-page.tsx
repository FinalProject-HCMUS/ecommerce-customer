import React, { useEffect } from 'react';
import BlogList from '../../components/page/blog/BlogList';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Pagination from '../../components/shared/Pagination';
import { useBlogs } from '../../hooks/blogs';

const BlogListPage: React.FC = () => {
  const { blogs, loading, fetchBlogs } = useBlogs();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const postsPerPage: number = 4;

  useEffect(() => {
    fetchBlogs(); // Fetch blogs when the component mounts
  }, []);

  const handlePageChange = (pageNumber: number): void => {
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  // Get current posts for pagination
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="max-w-7xl mx-auto mt-10 mx-10 px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
        ]}
      />

      <main className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">Loading posts...</div>
          </div>
        ) : (
          <>
            <BlogList posts={currentPosts} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(blogs.length / postsPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default BlogListPage;
