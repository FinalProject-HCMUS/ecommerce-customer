"use client"

import { useState } from "react"
import Breadcrumb from "../../components/shared/Breadcrumb"
import CartItem from '../../components/page/cart/CartItem'
import OrderSummary from "../../components/page/cart/OrderSummary"

function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      price: 145,
      size: "Large",
      color: "White",
      quantity: 1,
      image: "",
    },
    {
      id: 2,
      name: "Checkered Shirt",
      price: 180,
      size: "Medium",
      color: "Red",
      quantity: 1,
      image: "",
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountRate = 0.2 // 20%
  const discountAmount = subtotal * discountRate
  const deliveryFee = 15
  const total = subtotal - discountAmount + deliveryFee

  const orderSummaryData = {
    subtotal,
    discountRate,
    discountAmount,
    deliveryFee,
    total,
  }

  return (
    <div className="max-w-7xl mt-20 mx-8 mx-auto px-4 py-4">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Cart', path: '/cart' },
        ]}
      />

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Takes up 2/3 of the space on large screens */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
          ))}
        </div>

        {/* Order Summary - Takes up 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <OrderSummary data={orderSummaryData} />
        </div>
      </div>
    </div>
  )
}

export default App

