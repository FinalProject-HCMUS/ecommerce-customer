import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'react-feather'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning or end
      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...')
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <motion.div
      className="flex justify-center items-center flex-wrap gap-2 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <button
        className="flex items-center px-3 py-2 text-sm disabled:text-gray-300 disabled:cursor-not-allowed"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} className="mr-1" />
        <span>Previous</span>
      </button>

      <div className="flex items-center">
        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <motion.button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm mx-0.5 ${currentPage === page ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {page}
            </motion.button>
          ) : (
            <span key={index} className="mx-1 text-gray-500">
              {page}
            </span>
          ),
        )}
      </div>

      <button
        className="flex items-center px-3 py-2 text-sm disabled:text-gray-300 disabled:cursor-not-allowed"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <ChevronRight size={16} className="ml-1" />
      </button>
    </motion.div>
  )
}

export default Pagination
