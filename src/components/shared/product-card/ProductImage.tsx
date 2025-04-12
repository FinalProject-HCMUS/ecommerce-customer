interface ProductImageProps {
  imageUrl?: string;
}
export default function ProductImage({ imageUrl }: ProductImageProps) {
  return (
    <div className="relative overflow-hidden group">
      <img
        src={imageUrl}
        alt="Product Image"
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
    </div>
  );
}
