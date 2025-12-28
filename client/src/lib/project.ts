import api from "./axios";
import { ProjectType } from "@/helpers/types/projects";

export const createProject = async (data: ProjectType) => {
  return await api.post("/projects", data);
};

export const listProject = async () => {
  return await api.get("/projects");
};
export const getProject = async (id: number): Promise<any> => {
  return await api.get(`/projects/${id}`);
};
export const changeProjectStatus = async (
  id: number | any,
  status: string | any
) => {
  return await api.patch(`/projects/${id}/status`, { status });
};

export const editProject = async (id: number, data: ProjectType) => {
  return await api.patch(`/projects/${id}`, data);
};

export const deleteProject = async (id: number | any) => {
  return await api.delete(`/projects/${id}`);
};

export const addMember = async (id: number, data: any) => {
  return await api.post(`/projects/${id}/member`, data);
};

export const fetchMemebers = async (id: number): Promise<any> => {
  return await api.get(`/projects/${id}/member`);
};

export const deleteMember = async (id: number) => {
  return await api.delete(`/projects/member/${id}`);
};

export const editMember = async (id: number, isAdmin: boolean) => {
  return await api.patch(`/projects/member/${id}`, { isAdmin });
};

export const fetchStepper = async (id: number | any): Promise<any> => {
  return await api.get(`/projects/${id}/stepper`);
};

export const changeStepper = async (
  id: number | any,
  activeIndex: number,
  doneIndex: number
) => {
  return await api.post(`/projects/${id}/stepper`, { activeIndex, doneIndex });
};

export const finishStepper = async (id: number | any, activeIndex: number) => {
  return await api.post(`/projects/${id}/stepper/finish`, { activeIndex });
};

export const changeStepperBack = async (
  id: number | any,
  activeIndex: number
) => {
  return await api.post(`/projects/${id}/stepper/back`, { activeIndex });
};
