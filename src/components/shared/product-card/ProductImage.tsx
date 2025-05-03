import { Link } from 'react-router-dom'

interface ProductImageProps {
  id: string
  imageUrl?: string
}
export default function ProductImage({ id, imageUrl }: ProductImageProps) {
  return (
    <Link to={`/product/${id}`} className="relative overflow-hidden group">
      <img
        src={imageUrl}
        alt="Product Image"
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
    </Link>
  )
}
