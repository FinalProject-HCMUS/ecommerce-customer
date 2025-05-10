import type React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import { BlogResponse } from '../../../interfaces';
import { t } from '../../../helpers/i18n';
export interface BlogDetailProps {
  post: BlogResponse;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
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
        {t('btn.backToBlog')}
      </motion.button>

      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 gap-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(post.updatedAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDate(new Date().toString())}</span>
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
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
