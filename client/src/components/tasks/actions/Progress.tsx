import { ProgressType } from "@/components/types/tasks";
import percentage, { SliderValuetext } from "@/helpers/helper";
import { changeProgress } from "@/lib/tasks";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Progress = ({ open, close, id, progress }: ProgressType) => {
  const router = useRouter();
  const [value, setValue] = useState(progress);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const res = changeProgress(id, value);
    router.push("/");
    close();
  };
  const handleCancel = () => {
    close();
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          Changing progress percentage with the task ID ({id})
        </DialogTitle>
        <DialogContent>
          <Box marginY={1}>
            <Typography
              id="input-slider"
              gutterBottom
              color="rgba(0, 0, 0, 0.6)"
            >
              Progress percentage
            </Typography>
            <Slider
              aria-label="Restricted values"
              value={value}
              onChange={(e: any) => setValue(e?.target?.value)}
              getAriaValueText={SliderValuetext}
              step={null}
              valueLabelDisplay="auto"
              marks={percentage}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "0.5rem", // Adjust as needed
                },
                maxWidth: "95%",
                marginX: "7px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            change
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Progress;
