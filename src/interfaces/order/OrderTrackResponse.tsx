import { Status } from './Status';

export interface OrderTrackResponse {
  id: string;
  notes: string;
  status: Status;
  updatedTime: string;
}
