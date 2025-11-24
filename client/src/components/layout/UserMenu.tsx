import React, { useState } from "react";
import {
  Typography,
  Menu,
  Avatar,
  Tooltip,
  Box,
  MenuItem,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

const UserMenu = () => {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    router.push("/user/profile");
  };
  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {user ? (
            <Box sx={{ flexGrow: 0, md: "flex" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <p style={{ margin: "3px", color: "#fff" }}>
                    Hello, {user.firstName + " " + user.lastName || user.email}
                  </p>
                  <Avatar alt={user?.firstName} style={{ margin: "3px" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
              >
                <MenuItem key={1} onClick={handleProfile}>
                  <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link
              href="/auth"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign In
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default UserMenu;
