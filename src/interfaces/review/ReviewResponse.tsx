export interface ReviewResponse {
  /**
   * Unique identifier of the review
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string

  /**
   * Comment about the product/order
   * @example "Great quality product, arrived earlier than expected!"
   */
  comment: string

  /**
   * Brief headline or summary of the review
   * @example "Excellent product!"
   */
  headline: string

  /**
   * Rating from 1 to 5
   * @example 5
   */
  rating: number

  /**
   * Time when the review was submitted
   * @example "2023-05-15T15:30:00"
   */
  createdAt: string

  /**
   * ID of the order this review is for
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  orderId: string
}
