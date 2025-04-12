import type { ReactNode } from 'react';

// Order status types
export type OrderStatus =
  | 'NEW'
  | 'CANCELLED'
  | 'PROCESSING'
  | 'PACKAGED'
  | 'PICKED'
  | 'SHIPPING'
  | 'DELIVERED'
  | 'REFUNDED';

// Order item interface
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

// Status history entry
export interface StatusHistoryEntry {
  status: OrderStatus;
  date: string;
  note?: string;
}

// Order interface
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  statusHistory: StatusHistoryEntry[];
}

// Status configuration interface
export interface StatusConfig {
  icon: ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  text: string;
}

// Status configuration record
export type StatusConfigRecord = Record<OrderStatus, StatusConfig>;
