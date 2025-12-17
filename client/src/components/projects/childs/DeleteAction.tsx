"use client";
import { ProjectType } from "@/helpers/types/projects";
import { DeleteForever, EditNoteOutlined } from "@mui/icons-material";
import { useState } from "react";
import Delete from "../actions/Delete";

const DeleteAction = ({ project }: ProjectType | any) => {
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
      {open && <Delete open={open} close={handleClose} project={project} />}
      <DeleteForever
        sx={{ fontWeight: "300" }}
        color="error"
        onClick={handleOpen}
      />
    </>
  );
};

export default DeleteAction;
