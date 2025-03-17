import ProductCard from "./ProductCard"

const products = [
  { id: 1, title: "T-shirt with Tape Details", price: 145, rating: 4.5, reviews: 45 },
  { id: 2, title: "T-shirt with Tape Details", price: 145, rating: 4, reviews: 45 },
  { id: 3, title: "T-shirt with Tape Details", price: 145, rating: 4.5, reviews: 45 },
  { id: 4, title: "T-shirt with Tape Details", price: 145, rating: 5, reviews: 45 },
  { id: 5, title: "T-shirt with Tape Details", price: 145, rating: 5, reviews: 45 },
]

const TopSelling = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">TOP SELLING</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {products.map((product) => (
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
    
  )
}

export default TopSelling