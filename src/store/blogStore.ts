import { create } from "zustand";
import { Post } from "../types";

interface BlogState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Omit<Post, "id" | "date">) => void;
  updatePost: (id: number, post: Partial<Post>) => void;
  deletePost: (id: number) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          ...post,
          id: Math.max(0, ...state.posts.map((p) => p.id)) + 1,
          date: new Date().toISOString().split("T")[0],
        },
      ],
    })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
}));
