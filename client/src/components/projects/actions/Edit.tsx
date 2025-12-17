"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { editProject } from "@/lib/project";
import { useState } from "react";
import { ProjectType } from "@/helpers/types/projects";
import ApiError from "@/components/commons/ApiError";

const Edit = ({
  open,
  close,
  project,
}: {
  open: boolean;
  close: () => void;
  project: ProjectType | any;
}) => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null | undefined>(null);

  const [postData, setPostData] = useState({
    name: project.name,
    description: project.description,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!postData.name.trim()) newErrors.name = "Name is required";
    if (!postData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // submit
      try {
        await editProject(project.id, postData);
        router.push("/projects");
        close();
      } catch (error: any) {
        setApiError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "Create faild"
        );
      }
    }
  };

  const handleCancel = () => {
    close();
  };
  return (
    <Dialog open={open} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={postData.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            value={postData.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
          <ApiError message={apiError} />
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            edit project
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Edit;
