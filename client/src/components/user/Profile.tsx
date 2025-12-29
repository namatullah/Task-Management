"use client";
import { Card, CardContent } from "@mui/material";
import UsersList from "./users/UsersList";
import UserProfile from "./profile/UserProfile";
import { useAuth } from "@/hooks/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Card sx={{ margin: "25px" }} elevation={6}>
        <CardContent>
          <UserProfile user={user} />
          {user?.role === "admin" && (
            <UsersList user={user} title="Users list" />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
