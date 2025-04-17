import axios, { AxiosResponse, AxiosError } from 'axios';

// Base URL for the eCommerce API
const ECOMMERCE_API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your actual API base URL

// Function to get the token (replace with your actual token retrieval logic)
const getToken = () => {
  return localStorage.getItem('accessToken') || '';
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
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default client;
