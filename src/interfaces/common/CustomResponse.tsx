export interface CustomResponse<T> {
  /**
   * Timestamp of the response
   * @example "2023-01-01T12:00:00"
   */
  timestamp: string

  /**
   * HTTP status of the response
   * @example "OK"
   */
  httpStatus: string

  /**
   * Indicates if the operation was successful
   * @example true
   */
  isSuccess: boolean

  /**
   * Response data (null for operations without return data)
   */
  data?: T
}
