import { PriorityType } from "@/components/types/tasks";
import { changePriority } from "@/lib/tasks";
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

const Priority = ({ open, close, id, priority }: PriorityType) => {
  const router = useRouter();
  const [value, setValue] = useState(priority);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const res = changePriority(id, value);
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
          Changing priority of the task with the ID ({id})
        </DialogTitle>
        <DialogContent>
          <FormControl margin="dense" variant="outlined">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Priority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="priority"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
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

export default Priority;
