import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
  // withCredentials: true,
  timeout: 1000,
});

export const refreshTokens = async (): Promise<void> => {
  try {
    await axios.post(
      "http://localhost:3000/auth/refresh",
      {},
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        timeout: 1000,
      }
    );
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  _isRetry: boolean;
}

interface BypassedRoute {
  statusCodes: number[];
}

const routesToBypass: Record<string, BypassedRoute> = {
  "auth/login": {
    statusCodes: [401],
  },
};

const shouldBypassRetryForRoute = (
  url: string | undefined,
  statusCode: number | undefined
) => {
  if (!url && !statusCode) return false; // do not bypass

  if (url && statusCode)
    // bypass status code for route
    return (
      Object.keys(routesToBypass).includes(url) &&
      routesToBypass[url]?.statusCodes.includes(statusCode)
    );
};

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err instanceof AxiosError) {
      // bypass logic
      if (shouldBypassRetryForRoute(err.config?.url, err.response?.status)) {
        return Promise.reject(err);
      }

      const originalRequest = err.config as InternalAxiosRequestConfigWithRetry;
      let refreshTokenError, res;

      if (err.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          await refreshTokens();

          res = await axiosInstance.request(originalRequest);
        } catch (err) {
          refreshTokenError = err;
        }

        if (refreshTokenError) {
          // Reject the original request promise with the refresh token error
          return Promise.reject(refreshTokenError);
        }

        return Promise.resolve(res);
      }
    }

    return Promise.reject(err);
  }
);
