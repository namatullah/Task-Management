import { useAuth } from "@/hooks/AuthContext";
import { AddTaskOutlined } from "@mui/icons-material";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Add from "../actions/Add";

const TableTitle = ({
  isArchived,
  rerender,
  setRerender,
  projectId,
}: {
  isArchived: boolean | any;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number | null;
}) => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const openForm = () => {
    setOpen(true);
    setRerender(false);
  };
  const closeForm = () => {
    setOpen(false);
    setRerender(true);
  };
  return (
    <>
      {open && projectId && (
        <Add open={open} close={closeForm} projectId={projectId} />
      )}
      <TableRow>
        <TableCell align="left" colSpan={13}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {isArchived ? "Archived Tasks List" : "Tasks List"}
              <Link
                href={isArchived ? "/" : "/archived"}
                style={{
                  fontSize: "x-small",
                  textDecoration: "none",
                  marginLeft: "7px",
                }}
              >
                {isArchived ? "Un Archived" : "Archived"}
              </Link>
            </Typography>

            {isAuthenticated && projectId && !isArchived && (
              <Button
                variant="outlined"
                onClick={openForm}
                startIcon={<AddTaskOutlined />}
              >
                <span style={{ paddingTop: "inherit" }}>Add Task</span>
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableTitle;
