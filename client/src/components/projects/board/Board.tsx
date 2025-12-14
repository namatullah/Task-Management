"use client";
import { AddOutlined } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useLayoutEffect, useState } from "react";
import Add from "./actions/Add";
import { fetchMemebers } from "@/lib/project";
import UserTooltip from "@/components/tasks/child-components/UserTooltip";

const Board = ({ projectId }: number | any) => {
  const [open, setOpen] = useState(false);
  const [members, setMemebers] = useState([]);
  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );
  const openForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };
  useLayoutEffect(() => {
    const loadMemebers = async () => {
      try {
        const response = await fetchMemebers(projectId);
        setMemebers(response.data);
      } catch (error: any) {
        setSubmitError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "Create faild"
        );
      }
    };

    loadMemebers();
  }, [open]);

  return (
    <>
      {open && <Add members = {members} open={open} close={closeForm} projectId={projectId} />}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ alignContent: "button" }}
                >
                  Board Members
                  <Button startIcon={<AddOutlined />} onClick={openForm} />
                </Typography>
                {submitError && (
                  <Grid marginTop={2}>
                    <Alert severity="error">{submitError}</Alert>
                  </Grid>
                )}
              </TableCell>
            </TableRow>
            {members.map((member: any, index) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Tooltip title={<UserTooltip user={member} />}>
                    <span>{member.firstName + " " + member.lastName}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <DeleteIcon color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Board;
