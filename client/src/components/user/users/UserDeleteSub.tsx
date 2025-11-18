import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import Delete from "./Delete";

const UserDeleteSub = ({ userId }: number | any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && <Delete open={open} close={handleClose} id={userId} />}
      <Tooltip title="Delete the task" arrow placement="top">
        <DeleteIcon color="error" onClick={handleOpen} />
      </Tooltip>
    </>
  );
};

export default UserDeleteSub;
