"use client";
import { Card, CardContent } from "@mui/material";
import { useAuth } from "../layout/contexts/AuthContext";
import UsersList from "./users/UsersList";
import UserProfile from "./profile/UserProfile";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Card sx={{ margin: "25px" }} elevation={6}>
        <CardContent sx={{ display: "flex" }}>
          <UserProfile user={user} />
          <UsersList user={user} />
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
