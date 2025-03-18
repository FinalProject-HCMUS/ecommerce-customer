import type React from "react"
import { Star, StarHalf } from "lucide-react"

interface StarRatingProps {
  rating: number
  showScore?: boolean
  size?: "sm" | "md" | "lg"
}

const StarRating: React.FC<StarRatingProps> = ({ rating, showScore = false, size = "md" }) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const starSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${starSizes[size]} fill-current`} />
        ))}

        {hasHalfStar && <StarHalf className={`${starSizes[size]} fill-current`} />}

        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${starSizes[size]} text-gray-300`} />
        ))}
      </div>

      {showScore && <span className={`${textSizes[size]} text-gray-500 ml-1`}>{rating.toFixed(1)}/5</span>}
    </div>
  )
}

export default StarRating

