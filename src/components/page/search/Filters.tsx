import type React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'react-feather'
import { categories, colors, sizes } from '../../../data/filter'
import { t } from '../../../helpers/i18n'

interface FiltersProps {
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedColor: string | undefined
  setSelectedColor: (color: string) => void
  selectedSize: string | undefined
  setSelectedSize: (sizes: string) => void
  selectedCategorie: string | undefined
  setSelectedCategories: (categories: string) => void
}

const Filters = ({
  priceRange,
  setPriceRange,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}: FiltersProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleColorSelect = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor('')
    } else {
      setSelectedColor(color)
    }
  }

  const handleSizeSelect = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize('')
    } else {
      setSelectedSize(size)
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (e.target.name === 'min') {
      setPriceRange([value, priceRange[1]])
    } else {
      setPriceRange([priceRange[0], value])
    }
  }

  return (
    <motion.div
      className="w-full md:w-56 border border-gray-200 rounded-[12px] p-4 flex-shrink-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold m-0">{t('lbl.filter')}</h2>
        <button className="md:hidden relative w-5 h-4">
          <span className="block w-full h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-full h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-full h-0.5 bg-gray-800"></span>
        </button>
      </div>

      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-1"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="text-base font-medium m-0">{t('lbl.category')}</h3>
          {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.categories && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((category) => (
                <div key={category.id} className="py-2">
                  <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700">
                    {category.label}
                    <span className="text-gray-400">›</span>
                  </label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex justify-between items-center cursor-pointer py-1" onClick={() => toggleSection('price')}>
          <h3 className="text-base font-medium m-0">{t('lbl.price')}</h3>
          {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-3">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="relative h-5">
                  <input
                    type="range"
                    min="50"
                    max="250"
                    value={priceRange[0]}
                    name="min"
                    onChange={handlePriceChange}
                    className="absolute top-0 w-full h-1 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <input
                    type="range"
                    min="50"
                    max="250"
                    value={priceRange[1]}
                    name="max"
                    onChange={handlePriceChange}
                    className="absolute top-0 w-full h-1 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <div className="flex justify-between items-center cursor-pointer py-1" onClick={() => toggleSection('colors')}>
          <h3 className="text-base font-medium m-0">{t('lbl.color')}</h3>
          {expandedSections.colors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.colors && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* <div className="flex flex-wrap gap-2 py-3">
                {colors.map((color) => (
                  <motion.div
                    key={color.id}
                    className={`w-6 h-6 rounded-full cursor-pointer ${color.border ? 'border border-gray-300' : ''} ${selectedColors.includes(color.id) ? 'ring-2 ring-black ring-offset-1' : ''}`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => handleColorSelect(color.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Size */}
      <div className="mb-6">
        <div className="flex justify-between items-center cursor-pointer py-1" onClick={() => toggleSection('size')}>
          <h3 className="text-base font-medium m-0">{t('lbl.size')}</h3>
          {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.size && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* {sizes.slice(0, 4).map((size) => (
                    <motion.div
                      key={size.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-[12px] cursor-pointer ${selectedSizes.includes(size.id) ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
                      onClick={() => handleSizeSelect(size.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size.label}
                    </motion.div>
                  ))} */}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* {sizes.slice(4, 7).map((size) => (
                    <motion.div
                      key={size.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-[12px] cursor-pointer ${selectedSizes.includes(size.id) ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
                      onClick={() => handleSizeSelect(size.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size.label}
                    </motion.div>
                  ))} */}
                </div>
                {/* <div className="flex flex-wrap gap-2">
                  {sizes.slice(7).map((size) => (
                    <motion.div
                      key={size.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-[12px] cursor-pointer ${selectedSizes.includes(size.id) ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
                      onClick={() => handleSizeSelect(size.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size.label}
                    </motion.div>
                  ))}
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Filters
