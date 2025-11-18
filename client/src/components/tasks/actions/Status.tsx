import { StatusType } from "@/components/types/tasks";
import { changeStatus } from "@/lib/tasks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Status = ({ open, close, id, status }: StatusType) => {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const res = changeStatus(id, value);
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
          Changing Status of the task with the ID ({id})
        </DialogTitle>
        <DialogContent>
          <FormControl margin="dense" variant="outlined">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="in_progress"
                control={<Radio />}
                label="In progress"
              />
              <FormControlLabel
                value="completed"
                control={<Radio />}
                label="Completed"
              />
              <FormControlLabel
                value="cancelled"
                control={<Radio />}
                label="Cancelled"
              />
            </RadioGroup>
          </FormControl>
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

export default Status;
