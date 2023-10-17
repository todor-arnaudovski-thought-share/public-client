import { AxiosError } from "axios";
import { User, UserAuthData } from "../types/User";
import { axiosClient } from "./axiosClient";

export const register = async (data: UserAuthData): Promise<void> => {
  try {
    await axiosClient.post("auth/signup", data);
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const signIn = async (data: UserAuthData): Promise<User> => {
  try {
    const response = await axiosClient.post("auth/signin", data, {
      withCredentials: true,
    });

    return (response?.data as User) ?? null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const verifyUser = async (): Promise<User> => {
  try {
    const response = await axiosClient.get("auth/user", {
      withCredentials: true,
    });

    return (response?.data as User) ?? null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};
