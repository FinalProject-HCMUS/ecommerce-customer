import { ColorResponse, CustomResponse } from '../../interfaces'
import client from './request'

import { COLOR_PER_PAGE } from '../../constants/common'

export const getAllColors = async (): Promise<CustomResponse<ColorResponse[]>> => {
  const response = await client.get<CustomResponse<ColorResponse[]>>('/colors?page=0&size=' + COLOR_PER_PAGE)
  return response.data
}

export const getColorById = async (id: string): Promise<CustomResponse<ColorResponse>> => {
  const response = await client.get<CustomResponse<ColorResponse>>(`/colors/${id}`)
  return response.data
}
