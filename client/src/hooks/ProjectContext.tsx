"use client";

import { createContext, useContext, useState } from "react";

type ProjectContextType = {
  steppers: any[];
  status: string;
  setSteppers: (s: any[]) => void;
  setStatus: (s: string) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjectContext = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProjectContext must be used inside ProjectProvider");
  return ctx;
};

export const ProjectProvider = ({ children }: any) => {
  const [steppers, setSteppers] = useState<any[]>();
  const [status, setStatus] = useState("");

  return (
    <ProjectContext.Provider
      value={{ steppers, status, setSteppers, setStatus }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
