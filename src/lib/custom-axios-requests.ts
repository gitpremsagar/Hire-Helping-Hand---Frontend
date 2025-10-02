import axios from "axios";
import { store } from "@/redux/store";
import { authService } from "./modules/auth/auth.service";
import { resetAuth } from "./modules/auth/auth.redux.slice";
import router from "next/router";

const customAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(async (config) => {
  // Get the current state from Redux store
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor for handling 401 errors
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refreshed access token
        const response =
          await authService.getRefreshedAccessToken();
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      } catch (error) {
        console.error("Get refreshed access token error:", error);
        // Reset the auth state
        store.dispatch(resetAuth());
        // Redirect to the login page
        router.push("/login"); 
        return Promise.reject(error);
      }

      // Retry the request
      return customAxios(originalRequest);
    }

    // If the error is not a 401, reject the promise
    return Promise.reject(error);
  }
);

export default customAxios;
