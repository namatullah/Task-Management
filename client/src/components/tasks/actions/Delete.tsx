import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { DeleteType } from "@/components/types/tasks";
import { deleteTask } from "@/lib/tasks";

const Delete = ({ open, close, id }: DeleteType) => {
  const router = useRouter();

  const handleDelete = () => {
    try {
      const res = deleteTask(id);
      console.log("RES", res);
    } catch (error) {
      console.log("ERR", error);
    }
    router.push("/");
    close();
  };
  return (
    <Dialog maxWidth="lg" open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this task with the ID ({id})?
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
