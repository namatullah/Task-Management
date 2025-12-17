"use client";
import { ProjectType } from "@/helpers/types/projects";
import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import StatusChange from "../actions/StatusChange";

const Status = ({ project }: ProjectType | any) => {
  var textColor = "";
  switch (project.status) {
    case "not_started":
      textColor = "#A0A0A0";
      break;
    case "in_progress":
      textColor = "#007BFF";
      break;
    case "completed":
      textColor = "#28A745";
      break;
    case "on_hold":
      textColor = "#FFC107";
      break;
    case "cancelled":
      textColor = "#DC3545";
      break;
  }
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <p>
      <span style={{ color: textColor, fontWeight: "bold" }}>
        {project.status?.replace("_", " ").toUpperCase()}
      </span>{" "}
      {open && (
        <StatusChange open={open} close={handleClose} project={project} />
      )}
      <EditOutlined
        fontSize="small"
        sx={{ fontWeight: "300" }}
        color="primary"
        onClick={handleOpen}
      />
    </p>
  );
};

export default Status;
