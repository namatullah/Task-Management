import Board from "@/components/projects/board/Board";
import Status from "@/components/projects/childs/Status";
import { getProject } from "@/lib/project";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import ProjectContent from "@/components/projects/childs/ProjectContent";
import Tasks from "@/components/tasks/Tasks";
import ApiError from "@/components/commons/ApiError";
import ProjectStepper from "@/components/projects/stepper/ProjectStepper";
import EditAction from "@/components/projects/childs/EditAction";
import DeleteAction from "@/components/projects/childs/DeleteAction";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  var apiError = "";
  var project: any = {};

  try {
    project = (await getProject(Number(id))).data;
  } catch (error: any) {
    apiError =
      error?.response?.data.message || error.message || "failed to load task";
  }
  return (
    <Card elevation={0}>
      <CardContent>
        <ApiError message={apiError} />
        <TableContainer component={Paper} elevation={6}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1} key={project.id}>
                <TableCell sx={{ verticalAlign: "top" }}>
                  <ProjectStepper id={project.id} />
                </TableCell>
                <TableCell
                  width="30%"
                  sx={{
                    verticalAlign: "top",
                  }}
                >
                  <div>
                    <ProjectContent project={project} />
                    <Status status={project.status} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <Box>
                        <EditAction project={project} />
                        <DeleteAction project={project} />
                      </Box> */}
                    </Box>
                  </div>
                  <br />
                  <Board projectId={project.id} status={project.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Tasks isArchived={false} projectId={project.id} />
      </CardContent>
    </Card>
  );
};

export default page;
