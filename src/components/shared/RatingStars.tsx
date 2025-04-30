import type React from 'react'
import { StarIcon } from '../../icon/icon'

interface RatingProps {
  rating: number
  maxRating?: number
  showText?: boolean
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5, showText = true }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} filled={true} />
        ))}

        {hasHalfStar && <StarIcon filled={true} half={true} />}

        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} filled={false} />
        ))}
      </div>

      {showText && (
        <span className="ml-2 text-sm text-gray-600">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  )
}

export default Rating
