"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { BlogPostProps } from "../../../type/blog"

const BlogPost: React.FC<BlogPostProps> = ({ post, index }) => {
  return (
    <motion.article
      className="flex bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <div className="w-36 h-36 flex-shrink-0 bg-gray-200 flex items-center justify-center">
        {post.image ? (
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
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
      </div>
      <div className="p-4">
        <h2 className="text-xl font-medium mb-1">{post.title}</h2>
        <p className="text-gray-700">{post.description}</p>
      </div>
    </motion.article>
  )
}

export default BlogPost

