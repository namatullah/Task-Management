import { User } from "@/components/types/users";
import api from "./axios";

export const fetchUsers = async (): Promise<void | boolean | any> => {
  try {
    const response = await api.get("/users");
    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Login failed";
    return { success: false, error: errorMessage };
  }
};
export const deleteUser = async (id: any) => {
  return await api.delete(`/users/${id}`);
};

export const editUser = async (id: any, user: User) => {
  return await api.patch(`/users/${id}/edit`, user);
};

export const changesUserStatus = async (id: any) => {
  return await api.patch(`/users/${id}/status`);
};

export const changesUserRole = async (id: any, role: string) => {
  return await api.patch(`/users/${id}/role`, {role});
};

export const changePassword = async (id: any, password: string) => {
  return await api.patch(`/users/${id}/changePassword`, {password});
};