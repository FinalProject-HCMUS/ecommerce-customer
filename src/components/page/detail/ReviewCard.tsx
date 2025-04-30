import type React from 'react'
import { MoreHorizontal } from 'lucide-react'
import StarRating from '../../shared/RatingStars'

interface ReviewCardProps {
  author: string
  isVerified?: boolean
  rating: number
  content: string
  date: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({ author, isVerified = false, rating, content, date }) => {
  return (
    <div className="border border-gray-200 rounded-[12px] p-6 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="mb-2">
            <StarRating rating={rating} />
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">{author}</span>
            {isVerified && (
              <span className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </span>
            )}
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-700 my-3">{content}</p>
      <p className="text-sm text-gray-500">Posted on {date}</p>
    </div>
  )
}

export default ReviewCard
