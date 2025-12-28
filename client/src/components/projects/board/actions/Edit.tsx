import { ProjectMemberType } from "@/helpers/types/projects";
import { editMember } from "@/lib/project";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Edit = ({
  open,
  close,
  member,
}: {
  open: boolean;
  close: () => void;
  member: ProjectMemberType;
}) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(member.isAdmin);
  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await editMember(member.id, isAdmin);
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
  console.log(member);
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
        <DialogTitle>Changing Project Admin role</DialogTitle>
        <DialogContent>
          Project Admin?
          <Checkbox
            name="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            slotProps={{
              input: { "aria-label": "controlled" },
            }}
          />{" "}
          {submitError && (
            <Grid marginTop={2}>
              <Alert severity="error">{submitError}</Alert>
            </Grid>
          )}
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

export default Edit;
