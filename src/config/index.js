import React from "react";
import axios from "axios";
import TokenService from "./tokenservice";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Sử dụng import.meta.env thay vì process.env
});

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    // console.log(token)
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/api/User" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          // const rs = await api.post("/auth/refreshtoken", {
          //   refreshToken: TokenService.getLocalRefreshToken(),
          // });
          // const { accessToken } = rs.data;
          // TokenService.updateLocalAccessToken(accessToken);
          // return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
export default api;