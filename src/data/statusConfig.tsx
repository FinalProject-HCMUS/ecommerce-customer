import { Clock, CheckCircle, XCircle, Truck, Package } from 'lucide-react';
import type { ReactNode } from 'react';
import { Status } from '../interfaces/order/Status';

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

export const statusConfig: StatusConfigRecord = {
  [Status.NEW]: {
    icon: <Clock className="w-4 h-4 mr-1" />,
    color: 'text-purple-800',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200',
    text: 'New',
  },
  [Status.CANCELLED]: {
    icon: <XCircle className="w-4 h-4 mr-1" />,
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    text: 'Cancelled',
  },
  [Status.PROCESSING]: {
    icon: <Clock className="w-4 h-4 mr-1" />,
    color: 'text-amber-800',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
    text: 'Processing',
  },
  [Status.PACKAGED]: {
    icon: <Package className="w-4 h-4 mr-1" />,
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200',
    text: 'Packaged',
  },
  [Status.PICKED]: {
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
    color: 'text-indigo-800',
    bgColor: 'bg-indigo-100',
    borderColor: 'border-indigo-200',
    text: 'Picked',
  },
  [Status.SHIPPING]: {
    icon: <Truck className="w-4 h-4 mr-1" />,
    color: 'text-cyan-800',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-200',
    text: 'Shipping',
  },
  [Status.DELIVERED]: {
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    text: 'Delivered',
  },
  [Status.REFUNDED]: {
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
    color: 'text-rose-800',
    bgColor: 'bg-rose-100',
    borderColor: 'border-rose-200',
    text: 'Refunded',
  },
};