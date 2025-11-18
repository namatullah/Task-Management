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
  console.log('before send: ',id)
  return await api.delete(`/users/${id}`);
};