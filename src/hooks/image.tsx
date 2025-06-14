import { useState } from 'react';
import { imageApi } from '../services/apis/imageApis';

interface UseImageState {
  uploading: boolean;
  deleting: boolean;
  imageUrl: string | null;
  error: string | null;
}

export const useImage = () => {
  const [state, setState] = useState<UseImageState>({
    uploading: false,
    deleting: false,
    imageUrl: null,
    error: null,
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    setState((prev) => ({ ...prev, uploading: true, error: null }));

    try {
      const response = await imageApi.uploadImage(file);

      if (response.isSuccess && response.data) {
        const imageUrl = response.data;
        setState((prev) => ({ ...prev, uploading: false, imageUrl }));
        return imageUrl;
      } else {
        setState((prev) => ({
          ...prev,
          uploading: false,
          error: 'Failed to upload image',
        }));
        return null;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during upload';
      setState((prev) => ({
        ...prev,
        uploading: false,
        error: errorMessage,
      }));
      return null;
    }
  };

  const deleteImage = async (imageUrl: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, deleting: true, error: null }));

    try {
      const response = await imageApi.deleteImage(imageUrl);

      if (response.isSuccess && response.data) {
        setState((prev) => ({
          ...prev,
          deleting: false,
          imageUrl: prev.imageUrl === imageUrl ? null : prev.imageUrl,
        }));
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          deleting: false,
          error: 'Failed to delete image',
        }));
        return false;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during deletion';
      setState((prev) => ({
        ...prev,
        deleting: false,
        error: errorMessage,
      }));
      return false;
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const reset = () => {
    setState({
      uploading: false,
      deleting: false,
      imageUrl: null,
      error: null,
    });
  };

  return {
    uploadImage,
    deleteImage,
    clearError,
    reset,
    imageUrl: state.imageUrl,
    uploading: state.uploading,
    deleting: state.deleting,
    error: state.error,
  };
};
