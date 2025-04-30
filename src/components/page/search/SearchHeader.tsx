import { motion } from 'framer-motion'
import { ChevronDown } from 'react-feather'

interface SearchHeaderProps {
  totalProducts: number
  currentPage: number
  productsPerPage: number
}

const SearchHeader = ({ totalProducts, currentPage, productsPerPage }: SearchHeaderProps) => {
  const startProduct = (currentPage - 1) * productsPerPage + 1
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts)

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h1 className="text-2xl font-semibold mb-4">Result for search with keyword "..."</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600">
        <span>
          Showing {startProduct}-{endProduct} of {totalProducts} Products
        </span>
        <div className="flex items-center mt-2 sm:mt-0">
          <span>Sort by: </span>
          <button className="flex items-center ml-1 font-medium text-gray-800">
            Keyword <ChevronDown size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchHeader
