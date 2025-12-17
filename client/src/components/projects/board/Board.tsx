"use client";
import {
  AddOutlined,
  DeleteForever,
  EditNoteOutlined,
} from "@mui/icons-material";
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
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
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
      {open && <Add open={open} close={closeForm} projectId={projectId} />}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <p>
                  <b>Board Members</b>
                </p>
                {submitError && (
                  <Grid marginTop={2}>
                    <Alert severity="error">{submitError}</Alert>
                  </Grid>
                )}
              </TableCell>
            </TableRow>
            {members
              .sort((a: any, b: any) => b.isAdmin - a.isAdmin)
              .map((member: any, index) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Tooltip title={<UserTooltip user={member} />}>
                      <span>
                        {member.user.name}{" "}
                        {member.isAdmin && (
                          <span style={{ color: "blue" }}>(Admin)</span>
                        )}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <EditNoteOutlined color="secondary" />
                    <DeleteForever color="error" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button startIcon={<AddOutlined />} onClick={openForm} />
      </TableContainer>
    </>
  );
};

export default Board;
