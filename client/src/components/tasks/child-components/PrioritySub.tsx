import { ModeEdit } from "@mui/icons-material";
import React, { useState } from "react";
import { TasksType } from "@/components/types/tasks";
import Priority from "../actions/Priority";

const PrioritySub = ({ task }: { task: TasksType }) => {
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
        <Priority
          open={open}
          close={handleClose}
          id={task.id}
          priority={task.priority}
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

export default PrioritySub;
