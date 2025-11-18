import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { User } from "../../types/users";
import { UsersTableHeader, splitWithCommas } from "@/helpers/helper";
import ChangeStatus from "./ChangeStatus";
import ChangeRole from "./ChangeRole";

const UsersList = ({
  user,
  users,
  active,
  title,
}: {
  user: User | null;
  users: User[];
  active: boolean;
  title: string;
}) => {
  return (
    <TableContainer component={Paper} elevation={6} sx={{ marginY: "10px" }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }} colSpan={7}>
              {title}
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
            .filter((u: any) => u?.id !== user?.id && u.isActive === active)
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
                  <TableCell sx={{ padding: 0 }}>
                    {active? (<ChangeRole user={usr} />) : <>{usr.role}</>}
                    
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
                    <ChangeStatus user={usr} />
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
