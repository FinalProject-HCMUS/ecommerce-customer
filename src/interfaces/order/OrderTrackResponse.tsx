import { Status } from './Status'

export interface OrderTrackResponse {
  /**
   * Unique identifier of the order track
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string

  /**
   * Notes about the order tracking
   * @example "Package shipped from warehouse"
   */
  notes: string

  /**
   * Status of the order at this tracking point
   * @example "SHIPPED"
   */
  status: Status

  /**
   * Time when the status was updated
   * @example "2023-05-12T14:30:00"
   */
  updatedTime: string
}
