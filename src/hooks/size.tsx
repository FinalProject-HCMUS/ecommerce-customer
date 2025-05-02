import { getAllSizes, getSizeById } from '../services/apis/sizeApis'
import { useState } from 'react'

export const useSizes = () => {
  const [loading, setLoading] = useState(false)

  const fetchAllSizes = async () => {
    setLoading(true)
    try {
      const response = await getAllSizes()
      return response.data
    } finally {
      setLoading(false)
    }
  }

  const fetchSizeById = async (id: string) => {
    setLoading(true)
    try {
      const response = await getSizeById(id)
      return response.data
    } finally {
      setLoading(false)
    }
  }
  return {
    loading,
    fetchAllSizes,
    fetchSizeById,
  }
}
