import ProjectTitle from "@/components/projects/childs/ProjectTitle";
import { listProject } from "@/lib/project";
import { Alert, Card, CardContent, Grid, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Board from "@/components/projects/board/Board";
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
    <Card elevation={6} sx={{ m: 2 }}>
      <CardContent>
        {apiError && (
          <Grid marginTop={2}>
            <Alert severity="error">{apiError}</Alert>
          </Grid>
        )}
        <Grid container spacing={2}>
          <Grid size={12}>
            <ProjectTitle />
          </Grid>
          {projects.map((project: any) => (
            <Grid
              size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
              sx={{
                backgroundColor: "#f0f0f2",
                padding: 1,
                borderRadius: 1,
              }}
              key={project.id}
            >
              <div style={{ display: "flex" }}>
                <div style={{ display: "column", width: "80%" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project.description}
                  </Typography>
                  <Status status = {project.status} />
                  <EditNoteIcon color="secondary" />
                  <DeleteIcon color="error" />
                </div>
                <Board projectId={project.id} />
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default page;
