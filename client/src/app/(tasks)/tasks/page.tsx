import Tasks from "@/components/tasks/Tasks";
import { Card, CardContent } from "@mui/material";

const page = async () => {
  return (
    <Card elevation={0}>
      <CardContent>
        <Tasks projectId={null} isArchived={false} />
      </CardContent>
    </Card>
  );
};

export default page;
