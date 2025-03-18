import type React from "react"
import ProductCard from "./ProductCard"

const RelatedProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Polo with Contrast Trims",
      image: "",
      rating: 4.0,
      currentPrice: 212,
      originalPrice: 242,
      discountPercentage: 9,
    },
    {
      id: 2,
      name: "Gradient Graphic T-shirt",
      image: "",
      rating: 3.5,
      currentPrice: 145,
    },
    {
      id: 3,
      name: "Polo with Tipping Details",
      image: "",
      rating: 4.5,
      currentPrice: 180,
    },
    {
      id: 4,
      name: "Black Striped T-shirt",
      image: "",
      rating: 5.0,
      currentPrice: 120,
      originalPrice: 150,
      discountPercentage: 20,
    },
  ]

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-center mb-8">YOU MIGHT ALSO LIKE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            rating={product.rating}
            currentPrice={product.currentPrice}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

