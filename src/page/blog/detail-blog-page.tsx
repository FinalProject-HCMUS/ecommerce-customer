import BlogDetail from '../../components/page/blog/BlogDetail';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findPostById, getRelatedPosts } from '../../data/blog';
import { BlogPost } from '../../interfaces/temp/blog';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      if (id) {
        const postId = Number.parseInt(id, 10);
        const foundPost = findPostById(postId);

        if (foundPost) {
          setPost(foundPost);
          setRelatedPosts(getRelatedPosts(postId));
        }
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading post...</div>
        </div>
      </div>
    );
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
    );
  }

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
};

export default BlogDetailPage;
