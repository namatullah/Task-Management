import axios from "axios";
import { error } from "console";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
