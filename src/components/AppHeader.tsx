import { IconButton, Tooltip, Avatar } from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { cn } from "../utils/cn";
import { ui } from "../styles/ui";
import { PAGE_LABELS } from "../constants/appConfig";
import { useLocation } from "react-router-dom";
import { useThemeMode } from "../hooks/useThemeMode";

interface AppHeaderProps {
  userName: string;
}

export function AppHeader({ userName }: AppHeaderProps) {
  const userInitial = userName?.charAt(0).toUpperCase() || "A";
  const location = useLocation();
  const currentPageLabel = PAGE_LABELS[location.pathname] || "Dashboard";

  const { mode, toggleTheme } = useThemeMode();

  return (
    <header className={cn(ui.app.header, ui.layout.surface)}>
      {/* Page Name */}
      <div className={ui.app.headerSection}>
        <span className={cn(ui.app.headerPageTitle, ui.text.heading)}>
          {currentPageLabel}
        </span>
      </div>

      {/* Theme Toggle & Avatar */}
      <div className={ui.app.headerActions}>
        <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: mode === "light" ? "grey.300" : "grey.600",
              borderRadius: "12px",
              p: 1,
            }}
          >
            {mode === "light" ? (
              <Moon size={18} className="text-gray-600" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title={userName || "Admin User"}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {userInitial}
          </Avatar>
        </Tooltip>
      </div>
    </header>
  );
}
