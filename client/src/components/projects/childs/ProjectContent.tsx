"use client";
import { User } from "@/helpers/types/users";

interface ProjectType {
  name: string;
  description: string;
  status: string;
  users?: User[];
}
const ProjectContent = ({ project }: ProjectType | any) => {
  return (
    <div>
      <h2>{project.name}</h2>
      <p style={{ fontSize: "0.8rem" }}>{project.description}</p>
    </div>
  );
};

export default ProjectContent;
