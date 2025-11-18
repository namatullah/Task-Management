import EditNoteIcon from "@mui/icons-material/EditNote";
import React, { useState } from "react";
import Delete from "../actions/Delete";
import { Tooltip } from "@mui/material";
import { TasksType } from "@/components/types/tasks";
import Edit from "../actions/Edit";

const EditSub = ({ task }: { task: TasksType }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && <Edit open={open} close={handleClose} task={task} />}
      <Tooltip title="Delete the task" arrow placement="top">
        <EditNoteIcon color="primary" onClick={handleOpen} />
      </Tooltip>
    </>
  );
};

export default EditSub;
