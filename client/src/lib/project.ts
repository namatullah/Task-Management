import {
  PaginatedResponse,
  PaginationParams,
} from "@/helpers/types/pagination";
import api from "./axios";
import { ProjectType } from "@/helpers/types/projects";
import { User } from "@/helpers/types/users";

export const createProject = async (data: {
  name: string;
  description: string;
  status: string;
}) => {
  console.log(data);
  return await api.post("/projects", data);
};

export const listProject = async () => {
  return await api.get("/projects");
};
export const getProject = async (id: number): Promise<any> => {
  return await api.get(`/projects/${id}`);
};

export const addMember = async (id: number, data: any) => {
  return await api.post(`/projects/${id}/member`, data);
};

export const fetchMemebers = async (id: number): Promise<any> => {
  return await api.get(`/projects/${id}/member`);
};

export const deleteMember = async ( id: number) => {
  return await api.delete(`/projects/member/${id}`);
};
