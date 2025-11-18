import { TasksType } from "@/components/types/tasks";
import api from "./axios";

export const getTasks = async (): Promise<void> => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getArchived = async (): Promise<void> => {
  try {
    const response = await api.get("/tasks/archived");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteTask = async (id: any) => {
  return await api.delete(`tasks/${id}`);
};

export const postTask = async (data: TasksType | any) => {
  return await api.post("/tasks", data);
};

export const editTask = async (id: number | any, data: TasksType | any) => {
  return await api.patch(`/tasks/${id}`, data);
};

export const changeArchive = async (id: number | any) => {
  return await api.patch(`/tasks/${id}/archive`);
};

export const changeProgress = async (
  id: number | any,
  progress: number | any
) => {
  return await api.patch(`/tasks/${id}/progress`, { progress });
};
export const changePriority = async (
  id: number | any,
  priority: string | any
) => {
  return await api.patch(`/tasks/${id}/priority`, { priority });
};

export const changeStatus = async (id: number | any, status: string | any) => {
  return await api.patch(`/tasks/${id}/status`, { status });
};
