import { PaymentMethod } from './PaymentMethod'
import { Status } from './Status'
import { OrderTrackResponse } from './OrderTrackResponse'

export interface OrderResponse {
  /**
   * Unique identifier of the order
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string

  /**
   * First name of the customer
   * @example "John"
   */
  firstName: string

  /**
   * Last name of the customer
   * @example "Doe"
   */
  lastName: string

  /**
   * Phone number of the customer
   * @example "+1234567890"
   */
  phoneNumber: string

  /**
   * Current status of the order
   * @example "PROCESSING"
   */
  status: Status

  /**
   * Order creation date
   * @example "2023-05-10T10:30:00"
   */
  orderDate: string

  /**
   * Expected delivery date
   * @example "2023-05-15T15:30:00"
   */
  deliveryDate: string

  /**
   * Payment method for the order
   * @example "CREDIT_CARD"
   */
  paymentMethod: PaymentMethod

  /**
   * Shipping cost for the order
   * @example 10.99
   */
  shippingCost: number

  /**
   * Total product cost
   * @example 99.99
   */
  productCost: number

  /**
   * Subtotal before shipping
   * @example 99.99
   */
  subTotal: number

  /**
   * Total order amount
   * @example 110.98
   */
  total: number

  /**
   * ID of the customer
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  customerId: string

  /**
   * List of order tracks
   */
  orderTracks: OrderTrackResponse[]

  /**
   * Date and time when the order was created
   */
  createdAt: string

  /**
   * User who created the order
   * @example "admin"
   */
  createdBy: string

  /**
   * Date and time when the order was last updated
   */
  updatedAt: string

  /**
   * User who last updated the order
   * @example "admin"
   */
  updatedBy: string
}
