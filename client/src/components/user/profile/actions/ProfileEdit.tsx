import { User } from "@/helpers/types/users";
import { useAuth } from "@/hooks/AuthContext";
import { editUser } from "@/lib/user";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProfileEdit = ({
  open,
  close,
  user,
}: {
  open: boolean;
  close: () => void;
  user: User | null;
}) => {
  const { logout } = useAuth();
  const router = useRouter();

  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );

  const [name, setName] = useState<any>(user?.name);
  const [email, setEmail] = useState<any>(user?.email);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    const data = {
      name,
      email,
    };
    if (Object.keys(newErrors).length === 0) {
      try {
        await editUser(user?.id, data);
        router.push("/auth");
        await logout();
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
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name/Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            type="Text"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          {submitError && (
            <Grid marginTop={2}>
              <Alert severity="error">{submitError}</Alert>
            </Grid>
          )}
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            edit profile
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileEdit;
