import { ModeEdit } from "@mui/icons-material";
import React, { useState } from "react";
import { TasksType } from "@/components/types/tasks";
import Progress from "../actions/Progress";

const ProgressSub = ({ task }: { task: TasksType }) => {
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
        <Progress
          open={open}
          close={handleClose}
          id={task.id}
          progress={task.progress}
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

export default ProgressSub;
