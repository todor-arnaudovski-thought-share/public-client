import { axiosInstance } from "./axiosService";

export const EmailService = {
  verifyEmail: async (token: string) => {
    try {
      await axiosInstance.post(
        "/email-confirmation",
        { token },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
};
