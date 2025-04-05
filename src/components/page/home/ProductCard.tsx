import { Star, ShoppingCart } from 'lucide-react';
interface ProductCardProps {
  title: string;
  price: number;
  rating: number;
  reviews: number;
  showPrice?: boolean;
  image?: string;
}

const ProductCard = ({ title, price, rating, image }: ProductCardProps) => {
  return (
    <div className="max-w-sm mx-auto bg-gray-100 rounded-[20px] shadow-lg overflow-hidden ">
      <div className="relative">
        <img src={image} alt="Black t-shirt with tape details" className="w-full h-auto" />
        <div className="absolute bottom-0 left-0 right-0 bg-gray-500/50 backdrop-blur-sm p-2 flex justify-between items-center">
          <span className="text-xl font-medium text-white">${price}</span>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <ShoppingCart className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 fill-[50%]" />
          <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
