import { IconButton } from "@mui/material";
import { useThemeMode } from "@/hooks/ThemeContext";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} sx={{ mx:2 }}>
      {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
    </IconButton>
  );
};
