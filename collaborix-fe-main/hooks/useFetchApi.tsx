
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

// Định nghĩa kiểu cho ApiResponse
type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const useApi  =<T=unknown>() => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  // Hàm gọi API với phương thức GET
  const get = async (url: string) => {
    setResponse({ data: null, error: null, loading: true });
    try {
      const res = await axios.get<T>(url);
      setResponse({ data: res.data, error: null, loading: false });
    } catch (error) {
        console.log(error);
      const err = error as AxiosError;
      setResponse({ data: null, error: err.message, loading: false });
    }
  };

  // Hàm gọi API với phương thức POST
  const post = async (url: string, body: Record<string, any>) => {
    setResponse({ data: null, error: null, loading: true });
    try {
      const res = await axios.post<T>(url, body);
      setResponse({ data: res.data, error: null, loading: false });
    } catch (error) {
        console.log(error);
      const err = error as AxiosError;
      setResponse({ data: null, error: err.message, loading: false });
    }
  };

  return { response, get, post };
};

export default useApi;
