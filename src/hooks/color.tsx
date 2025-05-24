import { useState } from 'react';
import { getAllColors, getColorById } from '../services/apis/colorApis';
import { ColorResponse, Pageable } from '../interfaces';

export const useColors = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all colors
  const fetchAllColors = async (): Promise<
    Pageable<ColorResponse[]> | undefined
  > => {
    setLoading(true);
    try {
      const response = await getAllColors();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a color by ID
  const fetchColorById = async (
    id: string
  ): Promise<Pageable<ColorResponse> | undefined> => {
    setLoading(true);
    try {
      const response = await getColorById(id);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchAllColors, fetchColorById };
};
