export interface CustomError {
  timestamp: string;
  httpStatus: string;
  header: string;
  message?: string;
  isSuccess: boolean;
  subsErrors?: CustomSubError[];
}

export interface CustomSubError {
  message: string;
  field: string;
  value?: object;
  type?: string;
}
