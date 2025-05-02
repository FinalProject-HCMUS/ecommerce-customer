import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import localization from '../../constants/localization'
import { changeLanguage, getCurrentLanguage } from '../../helpers/localization'
import { IRegionItem } from '../../interfaces'
import localizationConstants from '../../constants/localization'
import { Avatar } from 'antd'

const { REGIONS } = localizationConstants

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<IRegionItem>(localization.REGIONS[getCurrentLanguage()])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelect = (regionItem: IRegionItem) => {
    setSelectedLanguage(regionItem)
    setIsOpen(false)
    changeLanguage(regionItem.key)
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left`}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center justify-between w-full px-4 text-sm font-medium bg-white border border-gray-200 rounded-[12px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200 ease-in-out"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center">
          <Avatar src={selectedLanguage.flag} shape="square" className="mx-2" />
          <span className="hidden sm:inline">{selectedLanguage.name}</span>
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transition-all duration-200 ease-in-out ${
          isOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu-button"
        tabIndex={-1}
      >
        <div className="py-1 max-h-60 overflow-auto" role="none">
          {Object.values(REGIONS).map((region) => (
            <button
              key={region.key}
              onClick={() => handleLanguageSelect(region)}
              className={`flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                selectedLanguage.key === region.key ? 'bg-gray-50' : ''
              }`}
              role="menuitem"
            >
              <Avatar src={region.flag} shape="square" className="mx-2" />
              <span className="flex-grow text-left">{region.name}</span>
              {selectedLanguage.key === region.key && <Check className="h-4 w-4 text-emerald-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
