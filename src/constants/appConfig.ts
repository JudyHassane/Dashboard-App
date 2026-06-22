import { Fade } from "@mui/material";
import { Book, LayoutDashboard, Users } from "lucide-react";

// Nav configuration
export const NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/books", icon: Book, label: "Books" },
  { to: "/authors", icon: Users, label: "Authors" },
];

// Page labels mapping
export const PAGE_LABELS: Record<string, string> = {
  "/": "Dashboard",
  "/books": "Books",
  "/authors": "Authors",
};

// Tooltip configuration
export const TOOLTIP_PROPS = {
  arrow: true,
  TransitionComponent: Fade,
  TransitionProps: { timeout: 200 },
  slotProps: {
    tooltip: {
      sx: {
        px: 1.2,
        py: 0.6,
      },
    },
  },
};
