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
}: {
  isArchived: boolean | any;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
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
      {open && <Add open={open} close={closeForm} />}
      <TableRow>
        <TableCell align="left" colSpan={13}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Projects
            </Typography>

            {isAuthenticated && (
              <Button
                variant="outlined"
                onClick={openForm}
                startIcon={<AddTaskOutlined />}
              >
                <span style={{ paddingTop: "inherit" }}>Add Project</span>
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableTitle;
