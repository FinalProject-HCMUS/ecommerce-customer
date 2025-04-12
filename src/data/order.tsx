import type { Order } from "../interfaces/temp/order"

// Mock data for demonstration
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2023-0001",
    date: "2023-04-15",
    status: "DELIVERED",
    items: [
      {
        id: "item1",
        name: "Premium Cotton T-Shirt",
        quantity: 2,
        price: 29.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "item2",
        name: "Slim Fit Jeans",
        quantity: 1,
        price: 59.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    total: 119.97,
    statusHistory: [
      { status: "NEW", date: "2023-04-15T08:30:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2023-04-15T09:15:00Z", note: "Payment confirmed" },
      { status: "PACKAGED", date: "2023-04-16T10:20:00Z", note: "Items packaged" },
      { status: "PICKED", date: "2023-04-16T14:45:00Z", note: "Ready for shipping" },
      { status: "SHIPPING", date: "2023-04-17T08:30:00Z", note: "In transit" },
      { status: "DELIVERED", date: "2023-04-20T13:25:00Z", note: "Package delivered" },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2023-0002",
    date: "2023-05-20",
    status: "SHIPPING",
    items: [
      {
        id: "item3",
        name: "Hooded Sweatshirt",
        quantity: 1,
        price: 49.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    total: 49.99,
    statusHistory: [
      { status: "NEW", date: "2023-05-20T10:15:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2023-05-20T11:30:00Z", note: "Payment confirmed" },
      { status: "PACKAGED", date: "2023-05-21T09:45:00Z", note: "Items packaged" },
      { status: "PICKED", date: "2023-05-21T15:20:00Z", note: "Ready for shipping" },
      { status: "SHIPPING", date: "2023-05-22T08:10:00Z", note: "In transit" },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2023-0003",
    date: "2023-06-10",
    status: "PROCESSING",
    items: [
      {
        id: "item4",
        name: "Leather Jacket",
        quantity: 1,
        price: 199.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "item5",
        name: "Wool Scarf",
        quantity: 1,
        price: 29.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    total: 229.98,
    statusHistory: [
      { status: "NEW", date: "2023-06-10T14:25:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2023-06-10T15:40:00Z", note: "Payment confirmed" },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2023-0004",
    date: "2023-07-05",
    status: "CANCELLED",
    items: [
      {
        id: "item6",
        name: "Summer Dress",
        quantity: 1,
        price: 79.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    total: 79.99,
    statusHistory: [
      { status: "NEW", date: "2023-07-05T09:10:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2023-07-05T10:30:00Z", note: "Payment confirmed" },
      { status: "CANCELLED", date: "2023-07-06T11:15:00Z", note: "Cancelled by customer" },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD-2023-0005",
    date: "2023-08-12",
    status: "REFUNDED",
    items: [
      {
        id: "item7",
        name: "Wireless Headphones",
        quantity: 1,
        price: 129.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    total: 129.99,
    statusHistory: [
      { status: "NEW", date: "2023-08-12T13:20:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2023-08-12T14:15:00Z", note: "Payment confirmed" },
      { status: "PACKAGED", date: "2023-08-13T10:30:00Z", note: "Items packaged" },
      { status: "PICKED", date: "2023-08-13T15:45:00Z", note: "Ready for shipping" },
      { status: "SHIPPING", date: "2023-08-14T09:20:00Z", note: "In transit" },
      { status: "DELIVERED", date: "2023-08-17T14:10:00Z", note: "Package delivered" },
      { status: "REFUNDED", date: "2023-08-20T11:25:00Z", note: "Product returned and refunded" },
    ],
  },
]
