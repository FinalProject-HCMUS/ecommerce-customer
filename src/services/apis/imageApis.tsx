import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';

const BASE_URL = '/images';

export const imageApi = {
  uploadImage: async (file: File): Promise<CustomResponse<string>> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await client.post<CustomResponse<string>>(
      `${BASE_URL}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
  deleteImage: async (imageUrl: string): Promise<CustomResponse<boolean>> => {
    const response = await client.delete<CustomResponse<boolean>>(
      `${BASE_URL}/delete`,
      {
        params: { imageUrl },
      }
    );
    return response.data;
  },
};
