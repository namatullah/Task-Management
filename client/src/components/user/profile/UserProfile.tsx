import React, { useState } from "react";
import { User } from "../../types/users";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ModeEdit } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ProfileEdit from "./ProfileEdit";

const UserProfile = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && <ProfileEdit open={open} close={handleClose} user={user} />}
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ width: "40%" ,marginY:'10px'}}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                User Profile
                <ModeEdit
                  sx={{ cursor: "pointer", fontSize: "15px", marginX: "4px" }}
                  color="primary"
                  onClick={handleOpen}
                />
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell sx={{ fontSize: "0.76rem" }}>
                <span style={{ color: "gray" }}>First Name: &nbsp; </span>{" "}
                {user?.firstName}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell sx={{ fontSize: "0.76rem" }}>
                <span style={{ color: "gray" }}>Last Name: &nbsp; </span>{" "}
                {user?.lastName}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell sx={{ fontSize: "0.76rem" }}>
                <span style={{ color: "gray" }}>Email: &nbsp; </span>{" "}
                {user?.email}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell sx={{ fontSize: "0.76rem" }}>
                <span style={{ color: "gray" }}>Role: &nbsp; </span>{" "}
                {user?.role}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserProfile;
