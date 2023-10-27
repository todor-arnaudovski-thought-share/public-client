import { AxiosError } from "axios";
import { User, UserAuthData } from "../types/User";
import { axiosInstance } from "./axiosService";

const handleAxiosErrorMessage = (err: AxiosError) => {
  switch ((err as AxiosError).response?.status) {
    case 401:
      return "Wrong username or password";
    case 409:
      return "A user with that username already exists";
    default:
      return "An unexpected error occured";
  }
};

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
        throw new Error(handleAxiosErrorMessage(err));
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
        throw new Error(handleAxiosErrorMessage(err));
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
      if (err instanceof AxiosError) {
        throw new Error(handleAxiosErrorMessage(err));
      }
      throw new Error((err as Error).message);
    }
  },
};
