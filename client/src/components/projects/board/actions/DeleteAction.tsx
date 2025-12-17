import { DeleteForever } from "@mui/icons-material";
import Delete from "./Delete";
import { ProjectMemberType } from "@/helpers/types/projects";
import { useState } from "react";

const DeleteAction = ({ member, setDeleteRender }: ProjectMemberType | any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setDeleteRender(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDeleteRender(false);
  };

  return (
    <>
      {open && <Delete open={open} close={handleClose} member={member} />}
      <DeleteForever onClick={handleOpen} color="error" />
    </>
  );
};

export default DeleteAction;
