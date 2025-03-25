import type React from 'react';
import { ChevronDown } from 'lucide-react';
import ReviewCard from './ReviewCard';

const ReviewSection: React.FC = () => {
  return (
    <div className="mt-16 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          All Reviews <span className="text-gray-500 font-normal">(451)</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5">
            <span className="text-sm mr-2">Latest</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition-colors">
            Write a Review
          </button>
        </div>
      </div>

      <ReviewCard
        author="Samantha D."
        isVerified={true}
        rating={4.5}
        content='"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It&apos;s become my favorite go-to shirt."'
        date="August 14, 2023"
      />

      <button className="w-full py-3 border border-gray-300 rounded-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
        Load More Reviews
      </button>
    </div>
  );
};

export default ReviewSection;
