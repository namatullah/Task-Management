"use client";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMember } from "@/lib/project";
import { fetchUsers } from "@/lib/user";

const Add = ({
  open,
  close,
  projectId,
}: {
  open: boolean;
  close: () => void;
  projectId: number;
}) => {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<any>([]);
  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );
  useLayoutEffect(() => {
    fetchUsers()
      .then((res) => setAllUsers(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [errors, setErrors] = useState<{
    user?: string;
  }>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!user) newErrors.user = "Select a user";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const data = {
        userId: user,
        isAdmin: isAdmin,
      };
      try {
        await addMember(projectId, data);
        router.push("/projects");
        close();
      } catch (error: any) {
        setSubmitError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "Add member faild"
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
        <DialogTitle>New Member</DialogTitle>
        <DialogContent>
          <TextField
            select
            name="user"
            margin="dense"
            id="outlined-select-currency"
            label="User"
            variant="outlined"
            value={user}
            fullWidth
            error={!!errors.user}
            helperText={errors.user}
            onChange={(e) => setUser(e.target.value)}
          >
            {allUsers.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
          Project Admin?
          <Checkbox
            name="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            slotProps={{
              input: { "aria-label": "controlled" },
            }}
          />
          {submitError && (
            <Grid marginTop={2}>
              <Alert severity="error">{submitError}</Alert>
            </Grid>
          )}
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            add member
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
