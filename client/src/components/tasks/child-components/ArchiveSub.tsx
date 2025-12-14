import { ArchiveOutlined, UnarchiveOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import Archive from "../actions/Archive";
import { TasksType } from "@/helpers/types/tasks";

const ArchiveSub = ({ task }: { task: TasksType }) => {
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [taskArchive, setTaskArchive] = useState(false);
  
  const handleOpenArchive = (id: any, isArchived: boolean | any) => {
    setOpen(true);
    setTaskArchive(isArchived);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Archive
          open={open}
          close={handleClose}
          id={id}
          isArchived={taskArchive}
        />
      )}
      <IconButton
        sx={{ cursor: "pointer" }}
        color={task.isArchived ? "secondary" : "primary"}
        onClick={() => handleOpenArchive(task.id, task.isArchived)}
      >
        {task.isArchived ? <UnarchiveOutlined /> : <ArchiveOutlined />}
      </IconButton>
    </>
  );
};

export default ArchiveSub;
