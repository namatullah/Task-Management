import ProjectTitle from "@/components/projects/childs/ProjectTitle";
import { listProject } from "@/lib/project";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Board from "@/components/projects/board/Board";
import Link from "next/link";
import ProjectContent from "@/components/projects/childs/ProjectContent";
import { DeleteForever, EditNoteOutlined } from "@mui/icons-material";
import Status from "@/components/projects/childs/Status";

const page = async () => {
  var apiError = "";
  var projects: any = [];

  try {
    projects = (await listProject()).data;
  } catch (error: any) {
    apiError =
      error?.response?.data.message || error.message || "failed to load tasks";
  }

  return (
    <Card elevation={0}>
      <CardContent>
        {apiError && (
          <Grid marginTop={2}>
            <Alert severity="error">{apiError}</Alert>
          </Grid>
        )}

        <TableContainer component={Paper} elevation={6}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={2}>
                  <ProjectTitle />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={project.id}>
                  <TableCell
                    width="50%"
                    sx={{
                      verticalAlign: "top",
                    }}
                  >
                    <ProjectContent project={project} />
                    <Status status={project.status} />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <EditNoteOutlined color="secondary" />
                        <DeleteForever color="error" />
                      </Box>
                      <Link
                        href={`/projects/${project.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Tasks details...
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Board projectId={project.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default page;
