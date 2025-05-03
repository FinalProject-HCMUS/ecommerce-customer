import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ReviewCard from './ReviewCard'
import { reviews as initialReviews } from '../../../data/reviews' // Adjust the import path as necessary
import { t } from '../../../helpers/i18n' // Adjust the import path as necessary

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState(initialReviews) // State for reviews
  const [visibleCount, setVisibleCount] = useState(2) // Number of reviews to show initially
  const [isWritingReview, setIsWritingReview] = useState(false) // Toggle review form visibility
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 0,
    content: '',
    date: new Date().toLocaleDateString(),
    isVerified: true,
  })

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2) // Load 2 more reviews
  }

  const handleWriteReviewToggle = () => {
    setIsWritingReview((prev) => !prev) // Toggle the review form
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviews((prev) => [{ ...newReview, id: Date.now() }, ...prev]) // Add the new review with a unique id to the top of the list
    setNewReview({
      author: '',
      rating: 0,
      content: '',
      date: new Date().toLocaleDateString(),
      isVerified: true,
    }) // Reset the form
    setIsWritingReview(false) // Hide the form
  }

  return (
    <div className="mt-16 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {t('lbl.allReviews')} <span className="text-gray-500 font-normal">({reviews.length})</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5">
            <span className="text-sm mr-2">{t('lbl.lastest')}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <button
            className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition-colors"
            onClick={handleWriteReviewToggle}
          >
            {isWritingReview ? 'Cancel' : 'Write a Review'}
          </button>
        </div>
      </div>

      {isWritingReview && ( // Show the review form if toggled
        <form onSubmit={handleSubmitReview} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={newReview.author}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Your Review
            </label>
            <textarea
              id="content"
              name="content"
              value={newReview.content}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}

      {reviews.slice(0, visibleCount).map((review) => (
        <ReviewCard
          key={review.id}
          author={review.author}
          isVerified={review.isVerified}
          rating={review.rating}
          content={review.content}
          date={review.date}
        />
      ))}

      {visibleCount < reviews.length && ( // Show "Load More Reviews" only if there are more reviews to load
        <button
          className="w-full py-3 border border-gray-300 rounded-[12px] text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={handleLoadMore}
        >
          Load More Reviews
        </button>
      )}
    </div>
  )
}

export default ReviewSection
