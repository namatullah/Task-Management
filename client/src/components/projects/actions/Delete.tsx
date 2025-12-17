import ApiError from "@/components/commons/ApiError";
import { ProjectType } from "@/helpers/types/projects";
import { deleteProject } from "@/lib/project";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Delete = ({
  open,
  close,
  project,
}: {
  open: boolean;
  close: () => void;
  project: ProjectType;
}) => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null | undefined>(null);
  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      router.push("/projects");
      close();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Project delete failed"
      );
    }
  };
  return (
    <Dialog maxWidth="sm" open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete the project <b>{project.name}</b> ?
        </DialogContentText>
        <ApiError message={apiError} />
      </DialogContent>

      <DialogActions style={{ padding: "0 25px 20px 20px" }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          yes
        </Button>
        <Button variant="contained" onClick={close}>
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
