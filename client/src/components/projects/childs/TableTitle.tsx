import { useAuth } from "@/hooks/AuthContext";
import { AddTaskOutlined } from "@mui/icons-material";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Add from "../actions/Add";

const TableTitle = () => {
  const { isAuthenticated } = useAuth();
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
      <Typography gutterBottom variant="h5" component="div">
        Projects
      </Typography>

      {isAuthenticated && (
        <Button
        sx={{mb:2}}
          onClick={openForm}
          startIcon={<AddTaskOutlined />}
        >
          <span style={{ paddingTop: "inherit" }}>Add Project</span>
        </Button>
      )}
    </>
  );
};

export default TableTitle;
