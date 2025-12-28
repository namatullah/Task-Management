import Board from "@/components/projects/board/Board";
import Status from "@/components/projects/childs/Status";
import { getProject } from "@/lib/project";
import {
  Card,
  CardContent,
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
                <TableCell width="30%" sx={{ verticalAlign: "top" }}>
                  <ProjectStepper id={project.id} />
                </TableCell>
                <TableCell
                  width="35%"
                  sx={{
                    verticalAlign: "top",
                  }}
                >
                  <div>
                    <ProjectContent project={project} />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    verticalAlign: "top",
                    pt: 5,
                  }}
                >
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
