import React, { useState } from 'react'
import ProductCard from '../../shared/product-card/ProductCard'
import { relatedProducts } from '../../../data/products'

const RelatedProducts: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(5) // Number of products to show initially

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5) // Load 5 more products
  }

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-center mb-8">YOU MIGHT ALSO LIKE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {relatedProducts.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < relatedProducts.length && ( // Show "See More" only if there are more products to load
        <div className="text-center mt-8">
          <button
            className="btn-primary border-2 border-gray-300 px-8 py-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </div>
  )
}

export default RelatedProducts
