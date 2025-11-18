import { ArchiveType } from "@/components/types/tasks";
import { changeArchive } from "@/lib/tasks";
import { ArchiveOutlined, UnarchiveOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";

const Archive = ({ open, close, id, isArchived }: ArchiveType) => {
  const router = useRouter();
  const handleArchive = () => {
    changeArchive(id);
    router.push(isArchived ? "/archived" : "/");
    close();
  };
  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {isArchived ? "Un Archive Task" : "Archive Task"}
        <IconButton
          sx={{ cursor: "pointer" }}
          color={isArchived ? "secondary" : "primary"}
        >
          {isArchived ? <UnarchiveOutlined /> : <ArchiveOutlined />}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {isArchived
            ? "Are you sure un archive the task with task ID (" + id + ") ?"
            : "Are you sure archive the task with task ID (" + id + ") ?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "0 25px 20px 20px" }}>
        <Button variant="contained" color="error" onClick={handleArchive}>
          yes
        </Button>
        <Button variant="contained" onClick={close}>
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Archive;
