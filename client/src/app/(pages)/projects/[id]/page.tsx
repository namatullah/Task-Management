import Board from "@/components/projects/board/Board";
import Status from "@/components/projects/childs/Status";
import { getProject } from "@/lib/project";
import { Card, CardContent, Grid } from "@mui/material";
import ProjectContent from "@/components/projects/childs/ProjectContent";
import Tasks from "@/components/tasks/Tasks";
import ApiError from "@/components/commons/ApiError";

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
        <Card elevation={6}>
          <CardContent>
            <ApiError message={apiError} />
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
                    <Status project={project} />
                  </div>
                  <Board projectId={project.id} status={project.status} />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Tasks isArchived={false} projectId={project.id} />
      </CardContent>
    </Card>
  );
};

export default page;
