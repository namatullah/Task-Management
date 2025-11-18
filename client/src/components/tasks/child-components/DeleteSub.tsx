import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Delete from "../actions/Delete";
import { Tooltip } from "@mui/material";

const DeleteSub = ({taskId}: number | any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <Delete
          open={open}
          close={handleClose}
          id={taskId}
        />
      )}
      <Tooltip title="Delete the task" arrow placement="top">
        <DeleteIcon color="error" onClick={handleOpen} />
      </Tooltip>
    </>
  );
};

export default DeleteSub;
