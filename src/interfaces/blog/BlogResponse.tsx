export interface BlogResponse {
  /**
   * Unique identifier of the blog
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Title of the fashion blog
   * @example "Top 10 Summer Outfits for 2024"
   */
  title: string;

  /**
   * Content of the blog
   * @example "Summer 2024 is all about vibrant colors and airy fabrics..."
   */
  content: string;

  /**
   * Image URL for the blog
   * @example "https://fashionstore.com/blog/summer-trends.jpg"
   */
  image: string;

  /**
   * ID of the admin or shop owner creating the blog
   * @example "5f3a2b8c-1d9e-4e6a-9238-6b7f4b2c9d1f"
   */
  userId: string;

  /**
   * Date and time when the blog was created
   */
  createdAt: string;

  /**
   * Date and time when the blog was last updated
   */
  updatedAt: string;

  /**
   * User who created the blog
   * @example "admin"
   */
  createdBy: string;

  /**
   * User who last updated the blog
   * @example "admin"
   */
  updatedBy: string;
}
