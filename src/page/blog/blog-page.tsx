'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import BlogList from '../../components/page/blog/BlogList';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Pagination from '../../components/page/search/Pagination';

import { blogPosts } from '../../data/blog';
import type { BlogPost } from '../../type/blog';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 4;
  const totalPages: number = Math.ceil(blogPosts.length / postsPerPage);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setPosts(blogPosts);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (pageNumber: number): void => {
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  // Get current posts
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: BlogPost[] = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="max-w-7xl mx-auto mt-10 mx-8 px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
        ]}
      />
      <main className="mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">Loading posts...</div>
          </div>
        ) : (
          <>
            <BlogList posts={currentPosts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </main>
    </div>
  );
};

export default BlogListPage;
