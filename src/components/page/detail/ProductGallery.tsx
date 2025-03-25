import type React from 'react';
import { useState } from 'react';
import imageClothes from '../../../assets/shirt.png';

const ProductGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`border rounded-[12px] p-1 cursor-pointer transition-all duration-300 hover:shadow-md ${
              selectedImage === idx ? 'border-black' : 'border-gray-200'
            }`}
            onClick={() => setSelectedImage(idx)}
          >
            <img src={imageClothes} alt={`T-shirt thumbnail ${idx + 1}`} className="w-16 h-16 object-cover" />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="bg-gray-100 rounded-[12px] p-4 flex items-center justify-center order-1 md:order-2 flex-1">
        <img
          src={imageClothes}
          alt="One Life Graphic T-shirt"
          className="max-h-[400px] object-contain transition-opacity duration-300"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
