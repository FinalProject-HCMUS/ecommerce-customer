import { useState } from 'react'
import { getProductColorSizesByProductId } from '../services/apis/productApis'
import { ProductColorSizeResponse } from '../interfaces'

export const useProductColorSize = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const fetchProductColorSizes = async (id: string): Promise<ProductColorSizeResponse[] | null> => {
    setLoading(true)
    try {
      const response = await getProductColorSizesByProductId(id)
      return response.data || null
    } finally {
      setLoading(false)
    }
  }

  return { loading, fetchProductColorSizes }
}
