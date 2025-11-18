import { List, ListItem } from "@mui/material";

const UserTooltip = ({
  user,
}: {
  user: { firstName: string; lastName: string; email: string; role: string };
}) => {
  return (
    <List sx={{ fontSize: "10px" }}>
      <ListItem>
        First Name:&nbsp;<b>{user?.firstName}</b>
      </ListItem>
      <ListItem>
        Last Name:&nbsp;<b>{user?.lastName}</b>
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
