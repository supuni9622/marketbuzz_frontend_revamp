import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const jsonToQueryParam = (obj: any): string => {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      params.append(key, obj[key]);
    }
  }
  return params.toString();
};

const getHeaders = (): AxiosRequestConfig => {
  const headers: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
      "x-auth": true
    }
  };
  return headers;
};

export const fetchGet = async <T>(url: string): Promise<T> => {
  try {
    const config = getHeaders();
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPost = async <T>(url: string, data: any): Promise<T> => {
  try {
    const config = getHeaders();
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPut = async <T>(url: string, data: any): Promise<T> => {
  try {
    const config = getHeaders();
    const response = await axios.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDelete = async <T>(url: string): Promise<T> => {
  try {
    const config = getHeaders();
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 