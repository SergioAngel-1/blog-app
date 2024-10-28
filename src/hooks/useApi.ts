import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useBlogStore } from "../store/blogStore";

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

  const { posts, setPosts } = useBlogStore();

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      if (posts.length === 0) {
        const response = await axios.get<T>(`/db.json`);
        const initialPosts = response.data.posts;
        setPosts(initialPosts);
      }

      let data: T;
      if (endpoint === "/posts") {
        data = posts as T;
      } else if (endpoint.startsWith("/posts/")) {
        const id = endpoint.split("/")[2];
        data = posts.find((post) => post.id === Number(id)) as T;

        if (!data) {
          throw new Error("Post not found");
        }
      } else {
        throw new Error("Invalid endpoint");
      }

      setState({
        data,
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
  }, [endpoint, posts, setPosts]);

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
