import client from './request'
import {
  CustomResponse,
  ProductResponse,
  TopProductResponse,
  Pageable,
  ProductImageResponse,
  ProductColorSizeResponse,
} from '../../interfaces'

export const getAllProducts = async (
  page: number = 0,
  perpage: number = 10,
  sort?: string[],
  keysearch?: string,
  category?: string,
  fromprice?: number,
  toprice?: number,
  color?: string,
  size?: string,
): Promise<CustomResponse<Pageable<ProductResponse[]>>> => {
  const response = await client.get<CustomResponse<Pageable<ProductResponse[]>>>('/products', {
    params: {
      page,
      perpage,
      sort: sort?.join(','),
      keysearch,
      category,
      fromprice,
      toprice,
      color,
      size,
    },
  })
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

export const getProductImagesByProductId = async (
  productId: string,
): Promise<CustomResponse<ProductImageResponse[]>> => {
  const response = await client.get<CustomResponse<ProductImageResponse[]>>(`/product-images/product/${productId}`)
  return response.data
}

export const getProductColorSizesByProductId = async (
  productId: string,
): Promise<CustomResponse<ProductColorSizeResponse[]>> => {
  const response = await client.get<CustomResponse<ProductColorSizeResponse[]>>(
    `/product-color-sizes/product/${productId}`,
  )
  return response.data
}
