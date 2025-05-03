import { useState } from 'react'
import {
  getCartItemById,
  getCartItemsByUserId,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  deleteCartItemByUserIdAndItemId,
} from '../services/apis/cartApis'
import { CartItemResponse, CreateCartItemRequest, UpdateCartItemRequest } from '../interfaces'

export const useCart = () => {
  const [loading, setLoading] = useState(false)

  // Fetch a cart item by ID
  const fetchCartItemById = async (id: string): Promise<CartItemResponse | null> => {
    setLoading(true)
    try {
      const response = await getCartItemById(id)
      return response.data || null
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }

  // Fetch cart items by user ID
  const fetchCartItemsByUserId = async (userId: string): Promise<CartItemResponse[] | null> => {
    setLoading(true)
    try {
      const response = await getCartItemsByUserId(userId)
      return response.data || null
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }

  // Create a new cart item
  const addCartItem = async (request: CreateCartItemRequest): Promise<CartItemResponse | null> => {
    setLoading(true)
    try {
      const response = await createCartItem(request)
      return response.data || null
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }

  // Update a cart item
  const modifyCartItem = async (id: string, request: UpdateCartItemRequest): Promise<CartItemResponse | null> => {
    setLoading(true)
    try {
      const response = await updateCartItem(id, request)
      return response.data || null
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }

  // Delete a cart item by ID
  const removeCartItem = async (id: string): Promise<boolean> => {
    setLoading(true)
    try {
      await deleteCartItem(id)
      return true
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete a cart item by user ID and item ID
  const removeCartItemByUserAndItem = async (userId: string, itemId: string): Promise<boolean> => {
    setLoading(true)
    try {
      await deleteCartItemByUserIdAndItemId(userId, itemId)
      return true
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    fetchCartItemById,
    fetchCartItemsByUserId,
    addCartItem,
    modifyCartItem,
    removeCartItem,
    removeCartItemByUserAndItem,
  }
}