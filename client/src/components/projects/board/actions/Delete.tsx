import { ProjectMemberType } from "@/helpers/types/projects";
import { deleteMember } from "@/lib/project";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useRouter } from "next/navigation";

const Delete = ({
  open,
  close,
  member,
}: {
  open: boolean;
  close: () => void;
  member: ProjectMemberType;
}) => {
  const router = useRouter();
  const handleDelete = () => {
    try {
      const res = deleteMember(member.id);
      
    } catch (error) {
      console.log("ERR", error);
    }
    router.push("/projects");
    close();
  };
  return (
    <Dialog maxWidth="sm" open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <b>{member.user.name}</b> from the project{" "}
          <b>{member.project.name}</b> ?
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ padding: "0 25px 20px 20px" }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          yes
        </Button>
        <Button variant="contained" onClick={close}>
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
