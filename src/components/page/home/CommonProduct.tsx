import React, { useState } from 'react';
import ProductCard from '../../shared/product-card/ProductCard';
import { Product } from '../../../type/product';

interface CommonProductsProps {
  title: string;
  data: Product[];
}

const CommonProducts: React.FC<CommonProductsProps> = ({ title, data }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Number of products to show initially

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Load 10 more products
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {data.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visibleCount < data.length && ( // Show "See more" only if there are more products to load
          <div className="text-center mt-12">
            <button
              className="btn-primary border-2 border-gray-300 px-8 py-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleSeeMore}
            >
              See more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommonProducts;