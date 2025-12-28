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
  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );
  const handleDelete = async () => {
    try {
      await deleteMember(member.id);
      router.push("/projects/" + member.project.id);
      close();
    } catch (error: any) {
      setSubmitError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Add member faild"
      );
    }
  };
  return (
    <Dialog maxWidth="sm" open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <b>{member.user.name}</b> from the project{" "}
          <b>{member.project.name}</b> ?
        </DialogContentText>
        {submitError && (
          <Grid marginTop={2}>
            <Alert severity="error">{submitError}</Alert>
          </Grid>
        )}
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
