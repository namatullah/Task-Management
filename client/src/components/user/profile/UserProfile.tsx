import { User } from "../../../helpers/types/users";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Actions from "./actions/Actions";

const UserProfile = ({ user }: { user: User | null }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{ width: "40%", marginY: "10px" }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>User Profile</p>
              <Actions user={user} />
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell sx={{ fontSize: "0.76rem" }}>
              <span style={{ color: "gray" }}>Name/Full Name: &nbsp; </span>{" "}
              {user?.name}
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
