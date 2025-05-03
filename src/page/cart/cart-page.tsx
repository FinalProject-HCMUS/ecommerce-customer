import { useState } from 'react'
import Breadcrumb from '../../components/shared/Breadcrumb'
import CartItem from '../../components/page/cart/CartItem'
import OrderSummary from '../../components/page/cart/OrderSummary'
import type { OrderSummaryData } from '../../interfaces/temp/cart'
import { CartItemResponse } from '../../interfaces'
import {t} from '../../helpers/i18n'

function App() {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([])

  const updateQuantity = (id: number, newQuantity: number): void => {
    
  }

  const removeItem = (id: number): void => {
    
  }

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountRate = 0.2 // 20%
  const discountAmount = subtotal * discountRate
  const deliveryFee = 15
  const total = subtotal - discountAmount + deliveryFee

  const orderSummaryData: OrderSummaryData = {
    subtotal,
    discountRate,
    discountAmount,
    deliveryFee,
    total,
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 mx-8 px-4 py-8">
      <Breadcrumb
        items={[
          { label: t('bread'), path: '/' },
          { label: 'Cart', path: '/cart' },
        ]}
      />

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} updateQuantity={updateQuantity} removeItem={removeItem} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <OrderSummary data={orderSummaryData} />
        </div>
      </div>
    </div>
  )
}

export default App
