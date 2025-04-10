import type React from "react"
import type { OrderItem as OrderItemType } from "../../../interfaces/order"

interface OrderItemProps {
  item: OrderItemType
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="flex items-center py-2 space-x-4">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md border border-gray-200"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <div className="text-sm text-gray-500">
          Qty: {item.quantity} × ${item.price.toFixed(2)}
        </div>
      </div>
      <div className="font-medium text-gray-900">${(item.quantity * item.price).toFixed(2)}</div>
    </div>
  )
}

export default OrderItem
