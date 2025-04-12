import type React from 'react';

const ProductDescription: React.FC = () => {
  return (
    <div className="mt-16 mb-8">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <div className="border border-gray-200 rounded-[12px] p-4">Description about product goes here.</div>
    </div>
  );
};

export default ProductDescription;
