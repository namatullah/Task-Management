"use client";
import { useAuth } from "@/hooks/AuthContext";
import { AddTaskOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Add from "../actions/Add";

const ProjectTitle = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const openForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <Add open={open} close={closeForm} />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography gutterBottom variant="h5" component="div">
          Projects
        </Typography>

        <Button
          sx={{ mb: 2 }}
          onClick={openForm}
          variant="outlined"
          startIcon={<AddTaskOutlined />}
          disabled={user?.role !== "admin"}
        >
          <span style={{ paddingTop: "inherit" }}>Add Project</span>
        </Button>
      </div>
    </>
  );
};

export default ProjectTitle;
