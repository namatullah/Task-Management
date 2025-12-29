import ProjectTitle from "@/components/projects/childs/ProjectTitle";
import { listProject } from "@/lib/project";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import Link from "next/link";
import ProjectContent from "@/components/projects/childs/ProjectContent";
import ApiError from "@/components/commons/ApiError";
import EditAction from "@/components/projects/childs/EditAction";
import DeleteAction from "@/components/projects/childs/DeleteAction";
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
        <Grid container spacing={2}>
          <Grid size={12}>
            <ProjectTitle />
            <ApiError message={apiError} />
          </Grid>
          {projects.map((project: any) => (
            <Grid 
            component={Paper}
            elevation={6}
              size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
              sx={{
                padding: 1,
                borderRadius: 1,border:'1'
              }}
              key={project.id}
            >
              <div style={{ margin: 4 }}>
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
                  <Link
                    href={`/projects/${project.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Tasks details...
                  </Link>
                </Box>
                <ProjectContent project={project} />
                <Status steppers={project.steppers} />
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default page;
