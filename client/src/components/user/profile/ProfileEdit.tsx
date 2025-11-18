import { useAuth } from "@/components/layout/contexts/AuthContext";
import { User } from "@/components/types/users";
import { editUser } from "@/lib/user";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
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

  const [firstName, setFirstName] = useState<any>(user?.firstName);
  const [lastName, setLastName] = useState<any>(user?.lastName);
  const [email, setEmail] = useState<any>(user?.email);
  const [role, setRole] = useState<any>(user?.role);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!role) newErrors.role = "Select a role";
    setErrors(newErrors);
    const data = {
      firstName,
      lastName,
      email,
      role,
    };
    if (Object.keys(newErrors).length === 0) {
      try {
        await editUser(user?.id, data);

        router.push("/auth");
        await logout();
        close();
      } catch (error: any) {
        if (error.response?.data?.message) {
          console.log(error.response?.data?.message);
        } else {
          console.log("Update Faild");
        }
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
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            type="Text"
            variant="outlined"
            required
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="Text"
            variant="outlined"
            required
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            variant="outlined"
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
          <FormControl margin="dense" variant="outlined" error={!!errors.role}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              User Role
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              defaultValue="user"
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
            {errors.role && (
              <p
                style={{
                  color: "#d32f2f",
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  lineHeight: "1.66",
                  letterSpacing: "0.03333em",
                  textAlign: "left",
                  margin: "3px 0 0 14px",
                }}
              >
                {errors.role}
              </p>
            )}
          </FormControl>

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
