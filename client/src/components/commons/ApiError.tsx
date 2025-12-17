import { Alert, Grid } from "@mui/material";

const ApiError = ({ message }: { message: string | any }) => {
  return (
    <>
      {message && (
        <Grid marginTop={2}>
          <Alert severity="error">{message}</Alert>
        </Grid>
      )}
    </>
  );
};

export default ApiError;
