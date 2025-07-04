import { ColorResponse, CustomResponse, Pageable } from '../../interfaces';
import client from './request';

import { common } from '../../constants';

const { COLOR_PER_PAGE } = common;

export const getAllColors = async (): Promise<
  CustomResponse<Pageable<ColorResponse[]>>
> => {
  const response = await client.get<CustomResponse<Pageable<ColorResponse[]>>>(
    '/colors?page=0&size=' + COLOR_PER_PAGE
  );
  return response.data;
};

export const getColorById = async (
  id: string
): Promise<CustomResponse<Pageable<ColorResponse>>> => {
  const response = await client.get<CustomResponse<Pageable<ColorResponse>>>(
    `/colors/${id}`
  );
  return response.data;
};
