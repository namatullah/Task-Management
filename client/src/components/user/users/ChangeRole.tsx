import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { User } from "@/components/types/users";

const ChangeRole = ({ user }: User | any) => {
  const [role, setRole] = useState<any>(user?.role);

  return (
    <FormControl variant="outlined" size="small">
      <RadioGroup
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
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
