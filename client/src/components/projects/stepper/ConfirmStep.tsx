import { ProjectMemberType } from "@/helpers/types/projects";
import { deleteMember } from "@/lib/project";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ConfirmStep = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const router = useRouter();
  
  return (
    <Dialog maxWidth="sm" open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>
            this a content
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ padding: "0 25px 20px 20px" }}>
        <Button variant="contained" color="error" onClick={close}>
          yes
        </Button>
        <Button variant="contained" onClick={close}>
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmStep;
