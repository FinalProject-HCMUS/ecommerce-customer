import { Status } from './Status';

export interface OrderSearchParams {
  keyword?: string;
  status?: Status;
  page?: number;
  size?: number;
  sort?: string[];
}
