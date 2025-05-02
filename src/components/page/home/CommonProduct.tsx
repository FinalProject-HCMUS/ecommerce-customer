import React, { useState } from 'react'
import ProductCard from '../../shared/product-card/ProductCard'
import { ProductResponse } from '../../../interfaces'
import { VISIBLE_PRODUCT } from '../../../constants/common'
import { t } from '../../../helpers/i18n'

interface CommonProductsProps {
  title: string
  data: ProductResponse[]
}

const CommonProducts: React.FC<CommonProductsProps> = ({ title, data }) => {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PRODUCT) // Number of products to show initially
  const initialVisibleCount = VISIBLE_PRODUCT // Define the initial number of visible products

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + VISIBLE_PRODUCT) // Load 5 more products
  }

  const handleShowLess = () => {
    setVisibleCount(initialVisibleCount) // Reset to the initial number of visible products
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {data.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          {visibleCount < data.length && ( // Show "See More" button if there are more products to load
            <button
              className="btn-primary border-2 border-gray-300 px-8 py-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
              onClick={handleSeeMore}
            >
              {t('btn.seeMore')}
            </button>
          )}

          {visibleCount > initialVisibleCount && ( // Show "Show Less" button if more than the initial products are visible
            <button
              className="btn-secondary border-2 border-gray-300 px-8 py-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleShowLess}
            >
              {t('btn.seeLess')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default CommonProducts
