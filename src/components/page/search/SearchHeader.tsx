import { motion } from 'framer-motion'
import { t } from '../../../helpers/i18n'
import React from 'react'
interface SearchHeaderProps {
  keySearch: string
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ keySearch }) => {
  if (!keySearch || keySearch.length === 0) {
    return null
  }

  return (
    <motion.div
      className="my-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h1 className="text-md font-semibold mb-4">{`${t('lbl.resultSearch')} ${keySearch}`}</h1>
    </motion.div>
  )
}

export default SearchHeader
