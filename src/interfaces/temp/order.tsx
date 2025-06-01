import type { ReactNode } from 'react';
import { Status } from '../order/Status';

// Status configuration interface
export interface StatusConfig {
  icon: ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  text: string;
}

// Status configuration record
export type StatusConfigRecord = Record<Status, StatusConfig>;
