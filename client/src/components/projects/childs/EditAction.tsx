"use client";
import { ProjectType } from "@/helpers/types/projects";
import { EditNoteOutlined } from "@mui/icons-material";
import { useState } from "react";
import Edit from "../actions/Edit";

const EditAction = ({ project }: ProjectType | any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    // setDeleteRender(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setDeleteRender(false);
  };
  return (
    <>
      {open && <Edit open={open} close={handleClose} project={project} />}
      <EditNoteOutlined
        sx={{ fontWeight: "300" }}
        color="secondary"
        onClick={handleOpen}
      />
    </>
  );
};

export default EditAction;
