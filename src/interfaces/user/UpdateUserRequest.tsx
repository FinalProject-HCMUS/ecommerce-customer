export interface UpdateUserRequest {
  /**
   * Phone number of the user
   * @example "1234567890"
   */
  phoneNumber: string

  /**
   * First name of the user
   * @example "John"
   */
  firstName: string

  /**
   * Last name of the user
   * @example "Doe"
   */
  lastName: string

  /**
   * Address of the user
   * @example "123 Main St, City, Country"
   */
  address?: string

  /**
   * Weight of the user in kilograms
   * @example 70
   */
  weight: number

  /**
   * Height of the user in centimeters
   * @example 175
   */
  height: number

  /**
   * Photo URL of the user
   * @example "https://example.com/photo.jpg"
   */
  photo?: string
}
