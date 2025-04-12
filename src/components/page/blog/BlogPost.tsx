import type React from 'react';
import { motion } from 'framer-motion';
import type { BlogPostProps } from '../../../interfaces/temp/blog';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';

const BlogPost: React.FC<BlogPostProps> = ({ post, index }) => {
  return (
    <motion.article
      className="flex flex-col sm:flex-row bg-gray-100 rounded-[12px] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <Link to={`/blog/${post.id}`} className="w-full sm:w-36 h-36 flex-shrink-0 bg-gray-200 overflow-hidden">
        {post.image ? (
          <div className="w-full h-full overflow-hidden">
            <img
              src={post.image || '/placeholder.svg'}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        {post.category && <span className="text-xs font-medium text-gray-600 mb-1">{post.category}</span>}
        <Link to={`/blog/${post.id}`} className="group">
          <h2 className="text-xl font-medium mb-1 group-hover:text-primary transition-colors">{post.title}</h2>
        </Link>
        <p className="text-gray-700 mb-2">{post.description}</p>
        <div className="mt-auto flex items-center text-sm text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(post.date)}</span>
          {post.readingTime && <span className="ml-3">{post.readingTime}</span>}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
