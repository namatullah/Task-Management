import api from "./axios";

export const createProject = async (data: {
  name: string;
  description: string;
}) => {
  return await api.post("/projects", data);
};
