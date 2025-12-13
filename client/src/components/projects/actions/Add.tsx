"use client";
import {
    Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postTask } from "@/lib/tasks";
import { FormType } from "../../types/tasks";
import { useAuth } from "@/hooks/AuthContext";
import { createProject } from "@/lib/project";

const Add = ({ open, close }: FormType) => {
  const { user } = useAuth();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );

  const [postData, setPostData] = useState({
    name: "",
    description: "",
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
        await createProject(postData);
        router.push("/");
        close();
      } catch (error: any) {
        setSubmitError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "Update Faild"
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
          {submitError && (
            <Grid marginTop={2}>
              <Alert severity="error">{submitError}</Alert>
            </Grid>
          )}
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            add project
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Add;
