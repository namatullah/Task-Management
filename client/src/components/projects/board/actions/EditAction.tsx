import { useState } from "react";
import Edit from "./Edit";
import { ProjectMemberType } from "@/helpers/types/projects";
import { EditNoteOutlined } from "@mui/icons-material";

const EditAction = ({ member, setEditRender }: ProjectMemberType | any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setEditRender(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditRender(false);
  };
  return (
    <>
      {open && <Edit open={open} close={handleClose} member={member} />}
      <EditNoteOutlined onClick={handleOpen} color="secondary" />
    </>
  );
};

export default EditAction;
