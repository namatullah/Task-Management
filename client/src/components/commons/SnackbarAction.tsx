import { Alert } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useState } from "react";
const SnackbarAction = ({
  title,
  background,
  openSnack,
  handleCloseSnack,
}: {
  title: string;
  background: string;
  openSnack: boolean;
  handleCloseSnack: () => void;
}) => {
  const [open, setOpen] = useState(openSnack);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    handleCloseSnack();
  };
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={background}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {title}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAction;