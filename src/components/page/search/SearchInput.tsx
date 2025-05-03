import { t } from '../../../helpers/i18n'
import { navbarSearchPlaceholder } from '../../../data/navbar'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

interface SearchInputProps {
  keySearch: string | undefined
  setKeySearch: (keySearch: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ keySearch, setKeySearch }) => {
  const [searchTemp, setSearchTemp] = useState<string>(keySearch || '')
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchTemp.trim() !== '') {
      setKeySearch(searchTemp) // Trigger the search function
    }
  }
  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        value={searchTemp}
        onChange={(e) => setSearchTemp(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder.search') || navbarSearchPlaceholder}
        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  )
}

export default SearchInput
