import React from "react";
import { User } from "../../types/users";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const UserProfile = ({ user }: { user: User | null }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{ margin: "11px", width: "40%" }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>User Profile</TableCell>
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
              <span style={{ color: "gray" }}>Role: &nbsp; </span> {user?.role}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProfile;
