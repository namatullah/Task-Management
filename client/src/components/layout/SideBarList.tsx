import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountBoxOutlined,
  LogoutOutlined,
  SettingsOutlined,
  TaskAltOutlined,
  TaskOutlined,
  WorkspacesOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { link } from "fs";
import { useAuth } from "@/hooks/AuthContext";

const NavigationLinks = [
  {
    type: 1,
    title: "Project",
    icon: <WorkspacesOutlined />,
    link: "/projects",
  },
  { type: 1, title: "Tasks", icon: <TaskOutlined />, link: "/tasks" },
  { type: 1, title: "My Tasks", icon: <TaskAltOutlined />, link: "/project" },
  { type: 2, title: "Profile", icon: <AccountBoxOutlined />, link: "/user/profile" },
  { type: 2, title: "Settings", icon: <SettingsOutlined />, link: "/project" },
  { type: 2, title: "Logout", icon: <LogoutOutlined />, link: "logout" },
];

const SideBarList = ({ open }: { open: boolean }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const handleClick = async (link: any) => {
    link === "logout" ? await logout() : router.push(link);
  };
  return (
    <>
      <List>
        {NavigationLinks.filter((nav) => nav.type === 1).map((link, index) => (
          <ListItem key={link.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleClick(link.link)}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
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
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
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
