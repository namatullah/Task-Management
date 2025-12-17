import { DeleteForever } from "@mui/icons-material";
import { forwardRef, useImperativeHandle, useState } from "react";
import Delete from "./Delete";
import { ProjectMemberType } from "@/helpers/types/projects";

const DeleteAction = forwardRef(({ member }: ProjectMemberType | any, ref) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    isActionDelete: open,
  }));

  return (
    <>
      {open && <Delete open={open} close={handleClose} member={member} />}
      <DeleteForever onClick={handleOpen} color="error" />
    </>
  );
});

export default DeleteAction;
