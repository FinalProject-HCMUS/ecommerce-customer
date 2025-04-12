import type React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { BlogDetailProps } from '../../../interfaces/blog';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';

const BlogDetail: React.FC<BlogDetailProps> = ({ post, relatedPosts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="max-w-7xl mt-10 mx-10 px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.button
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        onClick={() => navigate(-1)}
        variants={itemVariants}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to blog
      </motion.button>

      <motion.div variants={itemVariants} className="mb-8">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 gap-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-8 rounded-xl overflow-hidden"
        variants={itemVariants}
      >
        <img
          src={post.image || '/placeholder.svg?height=500&width=1000'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div className="md:w-2/3" variants={itemVariants}>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div className="md:w-1/3" variants={itemVariants}>
          {post.author && (
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-center mb-4">
                <img
                  src={post.author.avatar || '/placeholder.svg'}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <h4 className="font-medium">{post.author.name}</h4>
              </div>
              <p className="text-gray-600 text-sm">{post.author.bio}</p>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block group">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-3">
                        <img
                          src={relatedPost.image || '/placeholder.svg'}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{relatedPost.readingTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
