import { motion } from 'framer-motion';
import type { ProductResponse } from '../../../interfaces/product/ProductResponse';
import ProductCard from '../../shared/product-card/ProductCard';
import { t } from '../../../helpers/i18n';

interface ProductGridProps {
  products: ProductResponse[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">{t('lbl.noProductFound')}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 flex-grow"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
