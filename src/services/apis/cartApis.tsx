import client from './request'
import { CartItemResponse, CustomResponse, CreateCartItemRequest, UpdateCartItemRequest } from '../../interfaces'

// Fetch a cart item by ID
export const getCartItemById = async (id: string): Promise<CustomResponse<CartItemResponse>> => {
  const response = await client.get<CustomResponse<CartItemResponse>>(`/cart/${id}`)
  return response.data
}

// Fetch cart items by user ID
export const getCartItemsByUserId = async (userId: string): Promise<CustomResponse<CartItemResponse[]>> => {
  const response = await client.get<CustomResponse<CartItemResponse[]>>(`/cart/user/${userId}`)
  return response.data
}

// Create a new cart item
export const createCartItem = async (request: CreateCartItemRequest): Promise<CustomResponse<CartItemResponse>> => {
  const response = await client.post<CustomResponse<CartItemResponse>>('/cart', request)
  return response.data
}

// Update a cart item
export const updateCartItem = async (
  id: string,
  request: UpdateCartItemRequest,
): Promise<CustomResponse<CartItemResponse>> => {
  const response = await client.put<CustomResponse<CartItemResponse>>(`/cart/${id}`, request)
  return response.data
}

// Delete a cart item by ID
export const deleteCartItem = async (id: string): Promise<CustomResponse<void>> => {
  const response = await client.delete<CustomResponse<void>>(`/cart/${id}`)
  return response.data
}

// Delete a cart item by user ID and item ID
export const deleteCartItemByUserIdAndItemId = async (
  userId: string,
  itemId: string,
): Promise<CustomResponse<void>> => {
  const response = await client.delete<CustomResponse<void>>(`/cart/user/${userId}/item/${itemId}`)
  return response.data
}