import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";

const page = async () => {
  return (
    <Card elevation={0}>
      <CardContent>
        <TableContainer component={Paper} elevation={6}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography gutterBottom variant="h5" component="div">
                    Dashboard
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell sx={{ verticalAlign: "top" }}>
                  My Tasks:
                  <Link
                    href="/tasks"
                    style={{
                      fontSize: "x-small",
                      textDecoration: "none",
                      marginLeft: "7px",
                    }}
                  >
                    My Tasks
                  </Link>
                </TableCell>
                <TableCell sx={{ verticalAlign: "top" }}>
                  Projects:
                  <Link
                    href="/projects"
                    style={{
                      fontSize: "x-small",
                      textDecoration: "none",
                      marginLeft: "7px",
                    }}
                  >
                    Projects
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default page;
