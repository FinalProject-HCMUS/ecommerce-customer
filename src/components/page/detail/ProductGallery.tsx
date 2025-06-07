import React, { useState } from 'react';
import { ProductImageResponse } from '../../../interfaces';

const ProductGallery: React.FC<{ images: ProductImageResponse[] }> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            className={`w-24 h-24 object-cover cursor-pointer rounded-[12px] ${
              selectedImage === index ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img
          src={images[selectedImage]?.url}
          className="w-full h-auto rounded-[12px]"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
