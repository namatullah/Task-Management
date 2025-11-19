"use client";
import { LockOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../layout/contexts/AuthContext";

const AuthForm = () => {
  const router = useRouter();
  const { login, register, user } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Form data
  const [formData, setFormtData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: any) => {
    setFormtData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isSignUp) {
      const newErrors: typeof errors = {};

      if (!formData.firstName.trim())
        newErrors.firstName = "First Name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last Name is required";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.role) newErrors.role = "Select a role";

      // Confirm Password
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setIsLoading(false);
        const { confirmPassword, ...safeData } = formData;
        const result = await register(safeData);
        if (!result.success) {
          setSubmitError(result?.error);
        }
      }
    } else {
      setIsLoading(false);
      const result = await login(formData);
      if (!result.success) {
        setSubmitError(result?.error);
      }
    }
  };

  return (
    <Container component="main" style={{ maxWidth: "600px" }}>
      <Paper
        elevation={3}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          margin: "40px",
        }}
      >
        <Avatar style={{ margin: "10px", backgroundColor: "primary" }}>
          <LockOutline />
        </Avatar>
        <Typography variant="h5" style={{ margin: "4px" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "3px" }}
        >
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                  type="Text"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  type="Text"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </>
            )}
            <TextField
              name="email"
              label="Email"
              onChange={handleChange}
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            {isSignUp && (
              <FormControl
                margin="dense"
                variant="outlined"
                error={!!errors.role}
              >
                <FormLabel id="demo-row-radio-buttons-group-label">
                  User Role
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="status"
                  value={formData.role}
                  onChange={handleChange}
                  defaultValue="user"
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                  />
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
            )}

            <TextField
              name="password"
              label="Password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {isSignUp && (
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          {submitError ? (
            <Grid marginTop={2}>
              <Alert severity="error">{submitError}</Alert>
            </Grid>
          ) : (
            <Grid>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
