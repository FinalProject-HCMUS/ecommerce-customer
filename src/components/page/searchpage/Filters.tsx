"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "react-feather"

interface FiltersProps {
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedColors: string[]
  setSelectedColors: (colors: string[]) => void
  selectedSizes: string[]
  setSelectedSizes: (sizes: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  applyFilters: () => void
}

const Filters = ({
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  applyFilters,
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
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const handleSizeSelect = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    } else {
      setSelectedSizes([...selectedSizes, size])
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (e.target.name === "min") {
      setPriceRange([value, priceRange[1]])
    } else {
      setPriceRange([priceRange[0], value])
    }
  }

  const categories = [
    { id: "tshirts", label: "T-shirts" },
    { id: "shorts", label: "Shorts" },
    { id: "shirts", label: "Shirts" },
    { id: "hoodies", label: "Hoodies" },
    { id: "jeans", label: "Jeans" },
  ]

  const colors = [
    { id: "green", color: "#4CAF50" },
    { id: "red", color: "#F44336" },
    { id: "yellow", color: "#FFEB3B" },
    { id: "orange", color: "#FF9800" },
    { id: "blue", color: "#2196F3" },
    { id: "purple", color: "#9C27B0" },
    { id: "pink", color: "#E91E63" },
    { id: "white", color: "#FFFFFF", border: true },
    { id: "black", color: "#000000" },
  ]

  const sizes = [
    { id: "xxs", label: "XX-Small" },
    { id: "xs", label: "X-Small" },
    { id: "small", label: "Small" },
    { id: "medium", label: "Medium" },
    { id: "large", label: "Large" },
    { id: "xl", label: "X-Large" },
    { id: "xxl", label: "XX-Large" },
    { id: "3xl", label: "3X-Large" },
    { id: "4xl", label: "4X-Large" },
  ]

  return (
    <motion.div
      className="w-full md:w-56 border border-gray-200 rounded-md p-4 flex-shrink-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold m-0">Filters</h2>
        <button className="md:hidden relative w-5 h-4">
          <span className="block w-full h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-full h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-full h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-1"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="text-base font-medium m-0">Categories</h3>
          {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.categories && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
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
        <div className="flex justify-between items-center cursor-pointer py-1" onClick={() => toggleSection("price")}>
          <h3 className="text-base font-medium m-0">Price</h3>
          {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
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
        <div className="flex justify-between items-center cursor-pointer py-1" onClick={() => toggleSection("colors")}>
          <h3 className="text-base font-medium m-0">Colors</h3>
          {expandedSections.colors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.colors && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-2 py-3">
                {colors.map((color) => (
                  <motion.div
                    key={color.id}
                    className={`w-6 h-6 rounded-full cursor-pointer ${color.border ? "border border-gray-300" : ""} ${selectedColors.includes(color.id) ? "ring-2 ring-black ring-offset-1" : ""}`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => handleColorSelect(color.id)}
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
        <div className="flex justify-between items-center cursor-pointer py-1" onClick={() => toggleSection("size")}>
          <h3 className="text-base font-medium m-0">Size</h3>
          {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        <AnimatePresence>
          {expandedSections.size && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizes.slice(0, 4).map((size) => (
                    <motion.div
                      key={size.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-md cursor-pointer ${selectedSizes.includes(size.id) ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"}`}
                      onClick={() => handleSizeSelect(size.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size.label}
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizes.slice(4, 7).map((size) => (
                    <motion.div
                      key={size.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-md cursor-pointer ${selectedSizes.includes(size.id) ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"}`}
                      onClick={() => handleSizeSelect(size.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size.label}
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.slice(7).map((size) => (
                    <motion.div
                      key={size.id}
                      className={`px-2.5 py-1.5 text-xs border rounded-md cursor-pointer ${selectedSizes.includes(size.id) ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"}`}
                      onClick={() => handleSizeSelect(size.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        className="w-full py-2.5 bg-white border border-black rounded-md font-medium cursor-pointer transition-colors hover:bg-black hover:text-white mt-4"
        onClick={applyFilters}
        whileTap={{ scale: 0.98 }}
      >
        Apply Filter
      </motion.button>
    </motion.div>
  )
}

export default Filters

