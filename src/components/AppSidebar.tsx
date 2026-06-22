import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { LogOut } from "lucide-react";
import { cn } from "../utils/cn";
import { ui } from "../styles/ui";
import { NAV_ITEMS, TOOLTIP_PROPS } from "../constants/appConfig";
import { useAppDispatch } from "../store/features/hooks";
import { logoutUser } from "../store/features/auth/api";
import { toast } from "react-toastify";

const NAV_BUTTON_STYLE =
  "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200";

export function AppSidebar() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged out successfully");
    } else {
      toast.info("Logged out");
    }
  };

  return (
    <aside className={cn(ui.layout.surface, ui.app.sidebar)}>
      {/* Logo */}
      <div className={ui.app.sidebarLogo}>
        <span className={cn(ui.app.sidebarLogoText, ui.text.brand)}>LOGO</span>
      </div>

      {/* Nav Icons */}
      <nav className={ui.app.sidebarNav}>
        {NAV_ITEMS.map((item) => (
          <Tooltip
            key={item.to}
            title={item.label}
            placement="right"
            {...TOOLTIP_PROPS}
          >
            <span>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    NAV_BUTTON_STYLE,
                    isActive
                      ? "p-2 rounded-xl shadow-md shadow-indigo-500/20 bg-indigo-600 text-white"
                      : cn(
                          ui.text.muted,
                          "hover:bg-gray-100 dark:hover:bg-slate-700",
                          "hover:text-gray-700 dark:hover:text-slate-300",
                        ),
                  )
                }
              >
                <item.icon size={20} />
              </NavLink>
            </span>
          </Tooltip>
        ))}
      </nav>

      {/* Logout Button */}
      <div className={ui.app.sidebarFooter}>
        <Tooltip title="Logout" placement="right" arrow>
          <button
            onClick={handleLogout}
            className={cn(
              NAV_BUTTON_STYLE,
              "text-red-500 dark:text-red-400",
              "hover:bg-red-50 dark:hover:bg-red-900/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <LogOut size={20} />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
