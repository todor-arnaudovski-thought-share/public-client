import { AxiosError } from "axios";
import { Post } from "../types/Post";
import { axiosInstance } from "./axiosService";

export const PostsService = {
  fetchPosts: async (): Promise<Post[]> => {
    try {
      const response = await axiosInstance.get("posts");
      return response?.data ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw err.response?.data?.message;
      }

      throw new Error((err as Error).message);
    }
  },

  createPost: async (data: { content: string }): Promise<Post> => {
    try {
      const response = await axiosInstance.post("posts", data, {
        withCredentials: true,
      });
      return response?.data ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw err.response?.data?.message;
      }

      throw new Error((err as Error).message);
    }
  },

  upvotePost: async (postPubId: string): Promise<Post> => {
    try {
      const response = await axiosInstance.patch(
        `posts/${postPubId}/upvote`,
        {},
        {
          withCredentials: true,
        }
      );
      return response?.data ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw err.response?.data?.message;
      }

      throw new Error((err as Error).message);
    }
  },

  downvotePost: async (postPubId: string): Promise<Post> => {
    try {
      const response = await axiosInstance.patch(
        `posts/${postPubId}/downvote`,
        {},
        {
          withCredentials: true,
        }
      );
      return response?.data ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw err.response?.data?.message;
      }

      throw new Error((err as Error).message);
    }
  },
};
