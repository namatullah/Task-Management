import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingsOutlined,
  TaskAltOutlined,
  WorkspacesOutlined,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

const NavigationLinks = [
  {
    type: 1,
    title: "Home",
    icon: <HomeOutlined />,
    link: "/",
    scope: "home",
  },
  {
    type: 1,
    title: "My Tasks",
    icon: <TaskAltOutlined />,
    link: "/tasks",
    scope: "my_tasks",
  },
  {
    type: 1,
    title: "Project",
    icon: <WorkspacesOutlined />,
    link: "/projects",
    scope: "projects",
  },
  {
    type: 2,
    title: "Profile",
    icon: <AccountCircleOutlined />,
    link: "/profile",
    scope: "profile",
  },
  {
    type: 2,
    title: "Settings",
    icon: <SettingsOutlined />,
    link: "/project",
    scope: "settings",
  },
  {
    type: 2,
    title: "Logout",
    icon: <LogoutOutlined />,
    link: "logout",
    scope: "logout",
  },
];

const SideBarList = ({ open }: { open: boolean }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const handleClick = async (link: any) => {
    link === "logout" ? await logout() : router.push(link);
  };

  const isActive = (nav: any) => {
    if (!nav.scope) return false;
    // Project-scoped routes
    if (nav.scope === "my_tasks") {
      return pathname.startsWith("/tasks");
    }
    if (nav.scope === "projects") {
      return pathname.startsWith("/projects");
    }
    // Exact match routes
    return pathname === nav.link;
  };

  return (
    <>
      <List>
        {NavigationLinks.filter((nav) => nav.type === 1).map((link, index) => (
          <ListItem key={link.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isActive(link)}
              onClick={() => handleClick(link.link)}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  "&.Mui-selected": {
                    backgroundColor: "#b8d3ee",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#b8d3ee",
                  },
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.title}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavigationLinks.filter((nav) => nav.type === 2).map((link, index) => (
          <ListItem key={link.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isActive(link)}
              onClick={() => handleClick(link.link)}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  "&.Mui-selected": {
                    backgroundColor: "#b8d3ee",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#b8d3ee",
                  },
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.title}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SideBarList;
