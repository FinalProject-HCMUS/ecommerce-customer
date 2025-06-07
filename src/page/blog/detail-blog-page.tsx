import BlogDetail from '../../components/page/blog/BlogDetail';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBlogs } from '../../hooks/blogs';
import { BlogResponse } from '../../interfaces';
import { t } from '../../helpers/i18n';
import Loading from '../../components/shared/Loading';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchBlogById, loading } = useBlogs();
  const [post, setPost] = useState<BlogResponse | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const fetchedPost = await fetchBlogById(id);
        setPost(fetchedPost);
      }
    };
    loadPost();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="mx-auto mt-10 mx-8 px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">{t('error.blogNotFound')}</h2>
          <p className="text-gray-600 mb-6">{t('error.blogNotFoundText')}</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-gray-800 text-white rounded-[10px] hover:bg-gray-700 transition-colors"
          >
            {t('btn.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  return <BlogDetail post={post} />;
};

export default BlogDetailPage;
