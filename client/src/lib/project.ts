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

export const addMember = async (data: {
  user: string;
  projectId: number | any;
}) => {
  return await api.post("/projects/members", data);
};

export const listProject = async (params: PaginationParams): Promise<any> => {
  try {
    const response = await api.get<PaginatedResponse<ProjectType>>(
      "/projects",
      {
        params: {
          page: params.page,
          limit: params.limit,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data.message || error.message || "failed to load tasks"
    );
  }
};
