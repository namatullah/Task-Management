import { UserType } from "@/helpers/types/users";
import { List, ListItem } from "@mui/material";

const UserTooltip = ({ user }: UserType | any) => {
  return (
    <List sx={{ fontSize: "10px" }}>
      <ListItem>
        Full Name:&nbsp;<b>{user?.name}</b>
      </ListItem>
      <ListItem>
        Email:&nbsp;<b>{user?.email}</b>
      </ListItem>
      <ListItem>
        Role:&nbsp;<b>{user?.role}</b>
      </ListItem>
    </List>
  );
};

export default UserTooltip;
