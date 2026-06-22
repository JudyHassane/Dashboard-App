import { Outlet, Navigate } from "react-router-dom";

import { cn } from "../utils/cn";
import { ui } from "../styles/ui";
import { AppSidebar } from "../components/AppSidebar";
import { AppHeader } from "../components/AppHeader";
import { Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/features/hooks";

export default function AppLayout() {
  const { authStatus, user } = useAppSelector((state) => state.auth);
  const isAuthenticated = authStatus === "authenticated";

  if (authStatus === "unknown") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={cn(
        "min-h-screen flex transition-colors duration-300",
        ui.layout.base,
        ui.text.primary,
      )}
    >
      <AppSidebar />

      <div className={ui.app.mainContent}>
        <AppHeader userName={user?.name || ""} />

        <main className={ui.app.pageContent}>
          <div className={ui.app.contentWrapper}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
