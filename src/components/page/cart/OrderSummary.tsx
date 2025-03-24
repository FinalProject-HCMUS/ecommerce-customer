import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const OrderSummary = ({ data }) => {
  const { subtotal, discountAmount, deliveryFee, total } = data

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount (-20%)</span>
          <span className="font-medium text-red-500">-${discountAmount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-bold">${total}</span>
          </div>
        </div>

        <Link to="/checkout" className="w-full bg-black text-white py-4 px-6 rounded-full mt-6 flex items-center justify-center">
          <span>Go to Checkout</span>
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </div>
  )
}

export default OrderSummary

