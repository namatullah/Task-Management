import { AddOutlined } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Add from "./actions/Add";

const Board = ({ projectId }: number | any) => {
  const [open, setOpen] = useState(false);
  const openForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <Add open={open} close={closeForm} projectId = {projectId} />}
      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ alignContent: "buttom" }}
                >
                  Board Members
                  <Button startIcon={<AddOutlined />} onClick={openForm} />
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
              <TableCell>cell 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Board;
