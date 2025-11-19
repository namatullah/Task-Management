import { Button } from "@mui/material";
import React, { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import { User } from "@/components/types/users";
import ChangePassword from "./ChangePassword";

const Actions = ({ user }: { user: User | null }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openChPass, setOpenChPass] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenChPass = () => {
    setOpenChPass(true);
  };
  const handleCloseChPass = () => {
    setOpenChPass(false);
  };
  return (
    <>
      {openEdit && (
        <ProfileEdit open={openEdit} close={handleCloseEdit} user={user} />
      )}
      {openChPass && (
        <ChangePassword open={openChPass} close={handleCloseChPass} user={user} />
      )}
      <div>
        <Button variant="contained" color="primary" onClick={handleOpenEdit}>
          update
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenChPass}
        >
          change password
        </Button>
      </div>
    </>
  );
};

export default Actions;
