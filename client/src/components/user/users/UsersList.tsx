import { fetchUsers } from "@/lib/user";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { User } from "../../types/users";
import { UsersTableHeader, splitWithCommas } from "@/helpers/helper";
import UserDeleteSub from "./UserDeleteSub";

const UsersList = ({ user }: { user: User | null }) => {
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  }, [user]);

  return (
    <TableContainer component={Paper} elevation={6} sx={{ margin: "11px" }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }} colSpan={5}>
              Users List
            </TableCell>
          </TableRow>
          <TableRow>
            {UsersTableHeader.map((header, index) => {
              return (
                <TableCell
                  key={index}
                  align="left"
                  sx={{ fontWeight: "bold", color: "#b0b0d7" }}
                >
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter((u: any) => u?.id !== user?.id)
            .map((usr: any, index) => {
              return (
                <TableRow hover role="checkbox" key={index} tabIndex={-1}>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {usr.id}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {usr.firstName}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {usr.lastName}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {usr.email}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {usr.role}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {splitWithCommas(
                      new Date(usr.createdAt).toLocaleString(),
                      0
                    )}
                    <br />
                    {splitWithCommas(
                      new Date(usr.createdAt).toLocaleString(),
                      1
                    )}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    <UserDeleteSub userId={user?.id} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
