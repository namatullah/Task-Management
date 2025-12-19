import ProjectTitle from "@/components/projects/childs/ProjectTitle";
import { listProject } from "@/lib/project";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Board from "@/components/projects/board/Board";
import Link from "next/link";
import ProjectContent from "@/components/projects/childs/ProjectContent";
import Status from "@/components/projects/childs/Status";
import ApiError from "@/components/commons/ApiError";
import { ProjectType } from "@/helpers/types/projects";
import EditAction from "@/components/projects/childs/EditAction";
import DeleteAction from "@/components/projects/childs/DeleteAction";
import ProjectStepper from "@/components/projects/stepper/ProjectStepper";

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
        <ApiError message={apiError} />
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
              {projects.map((project: ProjectType | any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={project.id}>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <ProjectStepper project={project} />
                  </TableCell>
                  <TableCell
                    width="60%"
                    sx={{
                      verticalAlign: "top",
                    }}
                  >
                    <div>
                      <ProjectContent project={project} />
                      <Status project={project} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <EditAction project={project} />
                          <DeleteAction project={project} />
                        </Box>
                        {project.projectUsers.length > 0 && (
                          <Link
                            href={`/projects/${project.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            Tasks details...
                          </Link>
                        )}
                      </Box>
                    </div>
                    <br />
                    <Board projectId={project.id} status={project.status} />
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
