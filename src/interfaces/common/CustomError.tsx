export interface CustomError {
  /**
   * Timestamp of the error
   * @default new Date().toISOString()
   */
  timestamp: string;

  /**
   * HTTP status of the error
   */
  httpStatus: string;

  /**
   * Header of the error
   */
  header: string;

  /**
   * Message describing the error
   */
  message?: string;

  /**
   * Indicates whether the operation was successful
   * @default false
   */
  isSuccess: boolean;

  /**
   * List of sub-errors providing additional details
   */
  subErrors?: CustomSubError[];
}

export interface CustomSubError {
  /**
   * Message describing the sub-error
   */
  message: string;

  /**
   * Field associated with the sub-error
   */
  field: string;

  /**
   * Value associated with the sub-error
   */
  value?: object;

  /**
   * Type of the sub-error
   */
  type?: string;
}
