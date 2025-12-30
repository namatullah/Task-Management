"use client";
import { ProjectType } from "@/helpers/types/projects";
import { EditNoteOutlined } from "@mui/icons-material";
import { useState } from "react";
import Edit from "../actions/Edit";
import { Button, IconButton } from "@mui/material";
import { useAuth } from "@/hooks/AuthContext";

const EditAction = ({ project }: ProjectType | any) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const editable = user?.role === "admin";
  return (
    <>
      {open && <Edit open={open} close={handleClose} project={project} />}

      <IconButton disabled={!editable} onClick={handleOpen}>
        <EditNoteOutlined color={editable ? "secondary" : "disabled"} />
      </IconButton>
    </>
  );
};

export default EditAction;
