import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { User } from "@/helpers/types/users";
import { changesUserStatus } from "@/lib/user";
import { useRouter } from "next/navigation";

const ChangeStatus = ({ user }: User | any) => {
  const router = useRouter();
  const [active, setActive] = useState(user.isActive);
  const handleChange = async () => {
    try {
      const res = await changesUserStatus(user.id);
      if (res.status === 200) {
        setActive(res.data.isActive);
      }
      router.push('/profile')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      console.log(errorMessage);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography color="#9f9c9c">D</Typography>
        <Switch checked={active} onChange={handleChange} />
        <Typography color="primary">A</Typography>
      </Stack>
    </>
  );
};

export default ChangeStatus;
