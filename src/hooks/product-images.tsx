import { useState } from 'react'
import { getProductImagesByProductId } from '../services/apis/productApis'
import { ProductImageResponse } from '../interfaces'

export const useProductImages = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const fetchProductImages = async (id: string): Promise<ProductImageResponse[] | null> => {
    setLoading(true)
    try {
      const response = await getProductImagesByProductId(id)
      return response.data || null
    } finally {
      setLoading(false)
    }
  }

  return { loading, fetchProductImages }
}
