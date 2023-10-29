import { AxiosError } from "axios";
import { User, UserAuthData } from "../types/User";
import { axiosInstance } from "./axiosService";

export const AuthService = {
  verifyUser: async (): Promise<User> => {
    try {
      const response = await axiosInstance.get("auth/user", {
        withCredentials: true,
      });

      return (response?.data as User) ?? null;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },

  register: async (data: UserAuthData): Promise<User> => {
    try {
      const response = await axiosInstance.post("auth/register", data, {
        withCredentials: true,
      });

      return (response?.data as User) ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          err.response.data.message =
            "A user with that username already exists";
        }

        throw err.response?.data?.message; // this could either be an array or a string
      }

      throw new Error((err as Error).message);
    }
  },

  login: async (data: UserAuthData): Promise<User> => {
    try {
      const response = await axiosInstance.post("auth/login", data, {
        withCredentials: true,
      });

      return (response?.data as User) ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          throw new Error("Wrong username or password");
        }
      }

      throw new Error((err as Error).message);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(
        "auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
};
