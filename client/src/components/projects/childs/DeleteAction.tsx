"use client";
import { ProjectType } from "@/helpers/types/projects";
import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import Delete from "../actions/Delete";
import { useAuth } from "@/hooks/AuthContext";
import { IconButton } from "@mui/material";

const DeleteAction = ({ project }: ProjectType | any) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deletable =
    project.steppers.find((s: any) => s.status === "active" && s.index === 0) &&
    user?.role === "admin";

  return (
    <>
      {open && <Delete open={open} close={handleClose} project={project} />}
      <IconButton disabled={!deletable} onClick={handleOpen}>
        <DeleteForever color={deletable ? "error" : "disabled"} />
      </IconButton>
    </>
  );
};

export default DeleteAction;
