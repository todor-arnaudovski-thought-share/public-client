import { AxiosError } from "axios";
import { User, UserAuthData } from "../types/User";
import { axiosClient } from "./axiosClient";

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

export const verifyUser = async (): Promise<User> => {
  try {
    const response = await axiosClient.get("auth/user", {
      withCredentials: true,
    });

    return (response?.data as User) ?? null;
  } catch (err) {
    // if (err instanceof AxiosError) {
    //   throw new Error(handleAxiosErrorMessage(err));
    // }
    throw new Error((err as Error).message);
  }
};

export const register = async (data: UserAuthData): Promise<void> => {
  try {
    await axiosClient.post("auth/signup", data);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(handleAxiosErrorMessage(err));
    }
    throw new Error((err as Error).message);
  }
};

export const login = async (data: UserAuthData): Promise<User> => {
  try {
    const response = await axiosClient.post("auth/login", data, {
      withCredentials: true,
    });

    return (response?.data as User) ?? null;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(handleAxiosErrorMessage(err));
    }
    throw new Error((err as Error).message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosClient.post("auth/logout", null, {
      withCredentials: true,
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(handleAxiosErrorMessage(err));
    }
    throw new Error((err as Error).message);
  }
};
