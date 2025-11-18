import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { User } from "@/components/types/users";
import { changesUserRole } from "@/lib/user";

const ChangeRole = ({ user }: User | any) => {
  const [role, setRole] = useState<any>(user?.role);

  const handleChange = async(e: any) => {
    setRole(e.target.value);
    try {
       await changesUserRole(user.id, e.target.value);
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      console.log(errorMessage);
    }
  };
  return (
    <FormControl variant="outlined" size="small">
      <RadioGroup
        name="role"
        value={role}
        onChange={handleChange}
        defaultValue="user"
      >
        <FormControlLabel
          value="user"
          control={<Radio />}
          label="User"
          style={{ margin: 0 }}
        />
        <FormControlLabel
          value="admin"
          control={<Radio />}
          label="Admin"
          style={{ margin: 0 }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ChangeRole;
