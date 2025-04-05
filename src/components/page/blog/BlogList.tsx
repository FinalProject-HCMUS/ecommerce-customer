import type React from 'react';
import BlogPost from './BlogPost';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogListProps } from '../../../type/blog';

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <motion.div className="space-y-4 mx-10" layout>
      <AnimatePresence mode="wait">
        {posts.map((post, index) => (
          <BlogPost key={post.id} post={post} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogList;
