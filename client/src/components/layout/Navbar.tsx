"use client";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { TaskOutlined } from "@mui/icons-material";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            <TaskOutlined
              sx={{ display: { xs: "none", md: "flex" }, mt: 0.4, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Task Management
            </Typography>
          </div>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
