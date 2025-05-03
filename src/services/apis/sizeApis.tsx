import { SizeResponse, CustomResponse, Pageable } from '../../interfaces'
import client from './request'
import { SIZE_PER_PAGE } from '../../constants/common'

export const getAllSizes = async (): Promise<CustomResponse<Pageable<SizeResponse[]>>> => {
  const response = await client.get<CustomResponse<Pageable<SizeResponse[]>>>('/sizes?page=0&size=' + SIZE_PER_PAGE)
  return response.data
}

export const getSizeById = async (id: string): Promise<CustomResponse<Pageable<SizeResponse>>> => {
  const response = await client.get<CustomResponse<Pageable<SizeResponse>>>(`/sizes/${id}`)
  return response.data
}
