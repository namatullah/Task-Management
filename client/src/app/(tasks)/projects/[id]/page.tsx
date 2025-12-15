import Board from "@/components/projects/board/Board";
import Status from "@/components/projects/childs/Status";
import { getProject } from "@/lib/project";
import {
  Alert,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ProjectContent from "@/components/projects/childs/ProjectContent";
import ProjectTasks from "@/components/tasks/ProjectTasks";

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
    <>
      <Card elevation={0}>
        <CardContent>
          <Card elevation={6}>
            <CardContent>
              {apiError && (
                <Grid marginTop={2}>
                  <Alert severity="error">{apiError}</Alert>
                </Grid>
              )}
              <Grid container spacing={2}>
                <Grid
                  size={12}
                  sx={{
                    backgroundColor: "#f0f0f2",
                    padding: 1,
                    borderRadius: 1,
                  }}
                  key={project.id}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "column", width: "80%", margin: 4 }}>
                      <ProjectContent project={project} />
                      <Status status={project.status} />
                    </div>
                    <Board projectId={project.id} />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <ProjectTasks isArchived={false} projectId={project.id} />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
