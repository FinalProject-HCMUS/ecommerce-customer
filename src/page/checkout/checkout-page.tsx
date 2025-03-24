"use client"

import type React from "react"
import { useState } from "react"
import { CheckoutForm } from "../../components/page/checkout/CheckoutForm"
import { OrderSummary } from "../../components/page/checkout/OrderSummary"

function App() {
  const [formData, setFormData] = useState({
    name: "Le Minh Hoang",
    phone: "09876543223",
    address: "",
    paymentMethod: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="min-h-screen mt-20 mx-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-4">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="font-medium">Checkout</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Check out</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-1/2">
            <CheckoutForm
              formData={formData}
              onInputChange={handleInputChange}
              onPaymentMethodChange={handlePaymentMethodChange}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-50 rounded-lg p-6">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

