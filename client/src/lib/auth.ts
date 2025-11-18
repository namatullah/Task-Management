import api from "./axios";

export const signup = async (data: any) => {
  return await api.post("/auth/signup", data);
};

export const signin = async (data: any) => {
  return await api.post("/auth/login", data);
};

export const me = async () => {
  return await api.get("/auth/me");
};

export const signOut = async () => {
  return await api.post("/auth/logout");
};
