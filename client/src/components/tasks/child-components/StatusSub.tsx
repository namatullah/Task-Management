import { ModeEdit } from "@mui/icons-material";
import React, { useState } from "react";
import { TasksType } from "@/components/types/tasks";
import Status from "../actions/Status";

const StatusSub = ({ task }: { task: TasksType }) => {
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
        <Status
          open={open}
          close={handleClose}
          id={task.id}
          status={task.status}
        />
      )}
      <ModeEdit
        sx={{ cursor: "pointer" }}
        fontSize="small"
        color="primary"
        onClick={handleOpen}
      />
    </>
  );
};

export default StatusSub;
