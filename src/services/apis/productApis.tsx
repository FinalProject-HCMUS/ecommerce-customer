import client from './request'
import { CustomResponse } from '../../interfaces/common/CustomResponse'
import { ProductResponse } from '../../interfaces/product/ProductResponse'
import { TopProductResponse } from '../../interfaces/product/TopProduct'

// Fetch all products
export const getAllProducts = async (): Promise<CustomResponse<ProductResponse[]>> => {
  const response = await client.get<CustomResponse<ProductResponse[]>>('/products')
  return response.data
}

// Fetch a product by ID
export const getProductById = async (id: string): Promise<CustomResponse<ProductResponse>> => {
  const response = await client.get<CustomResponse<ProductResponse>>(`/products/${id}`)
  return response.data
}

// Fetch top products (top-selling and top-trending) with pagination
export const getTopProducts = async (
  page: number = 0,
  size: number = 30,
): Promise<CustomResponse<TopProductResponse>> => {
  const response = await client.get<CustomResponse<TopProductResponse>>('/products/top-products', {
    params: { page, size },
  })
  return response.data
}
