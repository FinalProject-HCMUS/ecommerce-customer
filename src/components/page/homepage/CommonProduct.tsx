import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../../type/product';

interface CommonProductsProps {
  title: string;
  data: Product[];
}

const CommonProducts: React.FC<CommonProductsProps> = ({ title, data }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {data.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary border-2 border-gray-300 px-8 py-2 rounded-full hover:bg-gray-100 transition-colors">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommonProducts;
