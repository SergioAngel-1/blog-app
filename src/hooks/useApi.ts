import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:3001";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(endpoint: string) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      let errorMessage = "An error occurred while fetching data";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  }, [endpoint]);

  useEffect(() => {
    let mounted = true;

    const execute = async () => {
      if (!mounted) return;
      await fetchData();
    };

    execute();

    return () => {
      mounted = false;
    };
  }, [fetchData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    fetchData,
  };
}
