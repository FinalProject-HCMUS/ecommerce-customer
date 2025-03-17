import { motion } from "framer-motion"
import { Star } from "react-feather"
import type { Product } from "../../../type/product"

interface ProductGridProps {
  products: Product[]
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
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-md overflow-hidden cursor-pointer transition-transform hover:shadow-md"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="text-base font-medium mb-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < product.rating ? "#FFD700" : "none"}
                  stroke={i < product.rating ? "#FFD700" : "#ccc"}
                  className="mr-0.5"
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{product.reviews}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductGrid

