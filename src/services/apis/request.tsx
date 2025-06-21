import axios, { AxiosResponse, AxiosError } from 'axios';
import { messageRenderUtils } from '../../utils';
import { t } from '../../helpers/i18n';
import localStorageConstants from '../../constants/localStorage';

// Base URL for the eCommerce API
const ECOMMERCE_API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getToken = () => {
  return localStorage.getItem(localStorageConstants.TOKEN || '');
};

// Create an Axios client for eCommerce
const client = axios.create({
  baseURL: ECOMMERCE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Authorization header
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle success and errors
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage =
      (error?.response?.data as { exceptionName?: string })?.exceptionName ||
      t('error.commonError');
    messageRenderUtils.showError(errorMessage);
    return Promise.reject(error);
  }
);

export default client;
