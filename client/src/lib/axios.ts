import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.API_INTERNAL_URL
    : process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       //token expired or invalid
//       window.location.href = "/auth";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
