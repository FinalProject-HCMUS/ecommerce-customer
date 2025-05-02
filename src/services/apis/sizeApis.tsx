import { SizeResponse, CustomResponse } from '../../interfaces'
import client from './request'
import { SIZE_PER_PAGE } from '../../constants/common'

export const getAllSizes = async (): Promise<CustomResponse<SizeResponse[]>> => {
  const response = await client.get<CustomResponse<SizeResponse[]>>('/sizes?page=0&size=' + SIZE_PER_PAGE)
  return response.data
}

export const getSizeById = async (id: string): Promise<CustomResponse<SizeResponse>> => {
  const response = await client.get<CustomResponse<SizeResponse>>(`/sizes/${id}`)
  return response.data
}
