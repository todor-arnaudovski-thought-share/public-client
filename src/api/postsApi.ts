import { AxiosError } from "axios";
import { Post } from "../types/Post";
import { axiosClient } from "./axiosClient";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosClient.get("posts");
    return response?.data ?? null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const createPost = async (data: { content: string }): Promise<Post> => {
  try {
    const response = await axiosClient.post("posts", data, {
      withCredentials: true,
    });
    return response?.data ?? null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const upvotePost = async (postPubId: string): Promise<Post> => {
  try {
    const response = await axiosClient.patch(
      `posts/${postPubId}/upvote`,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data ?? null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const downvotePost = async (postPubId: string): Promise<Post> => {
  try {
    const response = await axiosClient.patch(
      `posts/${postPubId}/downvote`,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data ?? null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};
