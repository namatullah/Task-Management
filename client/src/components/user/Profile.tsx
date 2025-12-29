"use client";
import { Card, CardContent } from "@mui/material";
import UsersList from "./users/UsersList";
import UserProfile from "./profile/UserProfile";
import { useLayoutEffect, useState } from "react";
import { fetchUsers } from "@/lib/user";
import { useAuth } from "@/hooks/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  }, [user]);
  return (
    <>
      <Card sx={{ margin: "25px" }} elevation={6}>
        <CardContent>
          <UserProfile user={user} />
          {user?.role === "admin" && (
            <>
              <UsersList
                user={user}
                users={users}
                title="Users list"
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
