import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Slider } from 'antd';
import { t } from '../../../helpers/i18n';
import { formatCurrency } from '../../../helpers/string';
import {
  CategoryResponse,
  ColorResponse,
  SizeResponse,
} from '../../../interfaces';

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedColor: string | undefined;
  setSelectedColor: (color: string) => void;
  selectedSize: string | undefined;
  setSelectedSize: (sizes: string) => void;
  selectedCategory: string | undefined;
  setSelectedCategory: (categories: string) => void;
  categories: CategoryResponse[] | undefined;
  colors: ColorResponse[] | undefined;
  sizes: SizeResponse[] | undefined;
}

const Filters = ({
  priceRange,
  setPriceRange,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedCategory,
  setSelectedCategory,
  categories,
  colors,
  sizes,
}: FiltersProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleColorSelect = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor('');
    } else {
      setSelectedColor(color);
    }
  };

  const handleSizeSelect = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize('');
    } else {
      setSelectedSize(size);
    }
  };

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
          {expandedSections.categories ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
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
              <div className="flex flex-wrap gap-2 py-3">
                {categories &&
                  categories.map((category) => (
                    <motion.div
                      key={category.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-[12px] cursor-pointer ${
                        selectedCategory === category.id
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category.name}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-1"
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-base font-medium m-0">{t('lbl.price')}</h3>
          {expandedSections.price ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
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
                  <span>{formatCurrency(priceRange[0], 'VND')}</span>
                  <span>{formatCurrency(priceRange[1], 'VND')}</span>
                </div>
                <Slider
                  range
                  min={0}
                  max={10000000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-6 mx-2"
                  tooltip={{
                    formatter: (value) => `$${value}`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-1"
          onClick={() => toggleSection('colors')}
        >
          <h3 className="text-base font-medium m-0">{t('lbl.color')}</h3>
          {expandedSections.colors ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
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
              <div className="flex flex-wrap gap-2 py-3">
                {colors &&
                  colors.map((color) => (
                    <motion.div
                      key={color.id}
                      className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor?.includes(color.name) ? 'ring-2 ring-black ring-offset-1' : ''}`}
                      style={{ backgroundColor: color.code }}
                      onClick={() => handleColorSelect(color.name)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Size */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-1"
          onClick={() => toggleSection('size')}
        >
          <h3 className="text-base font-medium m-0">{t('lbl.size')}</h3>
          {expandedSections.size ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
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
                  {sizes &&
                    sizes.slice(0, 4).map((size) => (
                      <motion.div
                        key={size.id}
                        className={`px-2.5 py-1.5 text-xs border rounded-[12px] cursor-pointer ${selectedSize?.includes(size.name) ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
                        onClick={() => handleSizeSelect(size.name)}
                        whileTap={{ scale: 0.98 }}
                      >
                        {size.name}
                      </motion.div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Filters;
