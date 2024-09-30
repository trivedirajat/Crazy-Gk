import axios from "axios";
import { BASE_URL, jwtconfig } from "../utils/Global";
const API_END_POINT = BASE_URL;
const Axios = axios.create({
  baseURL: API_END_POINT,
});

Axios.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      const error = new Error("No internet connection");
      error.name = "NetworkError";
      return Promise.reject(error);
    }

    const token = localStorage.getItem(jwtconfig.accessTokenStorageKey);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const userType = "admin";
    config.headers["require-auth"] = "true";
    config.headers["User-Type"] = userType;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      [401, 419].includes(error?.response?.status) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refresh_token = window.localStorage.getItem(
        jwtconfig.refreshTokenStoragekey
      );

      if (!refresh_token) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_END_POINT}/auth/refresh-token`,
          {
            refresh_token,
          }
        );
        if (response?.status === 440) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/auth/login";
        }
        const { accessToken } = response.data;
        localStorage.setItem(jwtconfig.accessTokenStorageKey, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        sessionStorage.clear();
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  }
);
export default Axios;
