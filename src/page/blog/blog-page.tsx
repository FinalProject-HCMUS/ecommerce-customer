import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import BlogList from '../../components/page/blog/BlogList';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Pagination from '../../components/shared/Pagination';
import { useBlogs } from '../../hooks/blogs';
import { t } from '../../helpers/i18n';
import { BLOG_PER_PAGE } from '../../constants/common';
import { BlogResponse } from '../../interfaces/blog/BlogResponse';
import { Pageable } from '../../interfaces/common/Pageable';

const BlogListPage: React.FC = () => {
  const { loading, fetchBlogs } = useBlogs();
  const [blogsResponse, setBlogsResponse] = useState<Pageable<
    BlogResponse[]
  > | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string[]>(['createdAt,desc']);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Handle search term debouncing to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch blogs when search term, page or sort option changes
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBlogs(
        currentPage - 1,
        BLOG_PER_PAGE,
        sortOption,
        debouncedSearchTerm || undefined
      );
      if (res) {
        setBlogsResponse(res);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, currentPage, sortOption]);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sortValue: string[]) => {
    setSortOption(sortValue);
    setShowSortMenu(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Sort options available in the UI
  const sortOptions = [
    { label: t('lbl.newest'), value: ['createdAt,desc'] },
    { label: t('lbl.oldest'), value: ['createdAt,asc'] },
    { label: t('lbl.titleAZ'), value: ['title,asc'] },
    { label: t('lbl.titleZA'), value: ['title,desc'] },
  ];

  const currentSortLabel =
    sortOptions.find(
      (option) => JSON.stringify(option.value) === JSON.stringify(sortOption)
    )?.label || sortOptions[0].label;

  return (
    <div className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.blog'), path: '/blog' },
        ]}
      />

      {/* Search and Sort UI */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-10 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('lbl.searchBlogs')}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm">{currentSortLabel}</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>

          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu">
                {sortOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSortChange(option.value)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      JSON.stringify(option.value) ===
                      JSON.stringify(sortOption)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <main>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">
              {t('lbl.loading')}
            </div>
          </div>
        ) : blogsResponse?.content?.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              {t('lbl.noResults')}
            </h2>
            <p className="text-gray-500">{t('lbl.tryDifferentSearch')}</p>
          </div>
        ) : (
          <>
            <BlogList posts={blogsResponse?.content} />

            <Pagination
              currentPage={currentPage}
              totalPages={blogsResponse?.totalPages || 0}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default BlogListPage;
