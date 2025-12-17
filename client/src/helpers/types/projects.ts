import { UserType } from "./users";

export interface ProjectType {
  id?: number;
  name: string;
  description: string;
  status?: string;
  projectUsers?:ProjectMemberType | any
}

export interface ProjectMemberType {
  id: number;
  isAdmin: boolean;
  user: UserType;
  project: ProjectType;
}
