import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { User } from "@/components/types/users";
import { changesUserStatus } from "@/lib/user";

const ChangeStatus = ({ user }: User | any) => {
  const [checked, setChecked] = useState(user.isActive);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);

    try {
      await changesUserStatus(user?.id, event.target.checked);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      console.log(errorMessage);
    }
  };
  console.log(user.firstName, user.isActive)
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography color="#9f9c9c">D</Typography>
        <Switch checked={checked} onChange={handleChange} />
        <Typography color="primary">A</Typography>
      </Stack>
    </>
  );
};

export default ChangeStatus;
