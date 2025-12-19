import ApiError from "@/components/commons/ApiError";
import { ProjectType } from "@/helpers/types/projects";
import { changeProjectStatus } from "@/lib/project";
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

const StatusChange = ({
  open,
  close,
  project,
}: {
  open: boolean;
  close: () => void;
  project: ProjectType | any;
}) => {
  const router = useRouter();
  const [status, setStatus] = useState(project?.status);
  const [apiError, setApiError] = useState<string | null | undefined>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await changeProjectStatus(project.id, status);
      router.push("/projects");
      close();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Add member faild"
      );
    }
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
        <DialogTitle>Change Project Status</DialogTitle>
        <DialogContent>
          <FormControl margin="dense" variant="outlined">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel
                value="not_started"
                control={<Radio />}
                label="Not Started"
              />
              <FormControlLabel
                value="in_progress"
                control={<Radio />}
                label="In Progress"
              />
              <FormControlLabel
                value="completed"
                control={<Radio />}
                label="Completed"
              />
              <FormControlLabel
                value="on_hold"
                control={<Radio />}
                label="On Hold"
              />
              <FormControlLabel
                value="cancelled"
                control={<Radio />}
                label="Cancelled"
              />
            </RadioGroup>
          </FormControl>

          <ApiError message={apiError} />
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

export default StatusChange;
