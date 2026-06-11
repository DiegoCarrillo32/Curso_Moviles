import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => Promise.reject(error),
);
