import { ui } from "./ui";
import type { SxProps, Theme } from "@mui/material";

export const detailsStyles = {
  pageWrapper: "space-y-6 animate-[fadeIn_0.45s_ease-out]",

  card: `${ui.card} ${ui.border.primary} overflow-hidden shadow-lg`,
  cardGrid:
    "grid grid-cols-1 items-start gap-8 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:p-9",

  contentColumn: "min-w-0 space-y-7",
  headerGroup: "space-y-4",
  titleGroup: "space-y-2",
  title: `${ui.text.primary} max-w-3xl text-2xl font-bold leading-tight sm:text-3xl`,
  subtitle: `${ui.text.secondary} text-sm font-medium sm:text-base`,
  tagsRow: "flex flex-wrap gap-2",

  mobileImageWrapper: "flex justify-center pt-2 pb-1 sm:pt-3 sm:pb-2 lg:hidden",
  desktopImageWrapper: "hidden justify-center lg:flex lg:pl-5",
  coverFrame:
    "w-56 sm:w-64 md:w-72 aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-xl bg-gray-100 dark:bg-slate-800 transition-transform duration-500 hover:-translate-y-1",
  coverImage: "w-full h-full object-cover",

  descriptionSection: "max-w-2xl space-y-2 pt-1 sm:pt-0",
  descriptionLabel: `text-xs font-semibold uppercase tracking-wide ${ui.text.muted}`,
  descriptionText: `${ui.text.secondary} text-sm leading-7`,

  metaRailSection: "relative overflow-hidden py-5 dark:border-slate-700",
  metaRailAccent:
    "absolute inset-y-5 left-0 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400",
  metaRailGrid:
    "grid gap-5 pl-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-8",
  metaLabel: `text-xs font-semibold uppercase tracking-wide ${ui.text.muted}`,
  metaPrimaryValue: `${ui.text.primary} text-3xl font-bold leading-none tracking-tight`,
  metaSecondaryWrapper:
    "space-y-2 sm:border-l sm:border-gray-100 sm:pl-8 dark:sm:border-slate-700",
  metaSecondaryDash: "h-px w-8 shrink-0 bg-indigo-200 dark:bg-indigo-500/40",
  metaSecondaryValue: `${ui.text.secondary} min-w-0 break-all font-mono text-sm font-medium tracking-widest`,

  backButton: `flex items-center gap-2 ${ui.text.brand} hover:gap-3 transition-all duration-300 text-sm font-medium`,

  notFoundCard: `${ui.card} ${ui.border.primary} p-8 text-center`,
  notFoundText: ui.text.secondary,

  categoryChip: {
    borderRadius: "999px",
    fontWeight: 600,
    textTransform: "capitalize",
    bgcolor: "rgba(99, 102, 241, 0.08)",
    color: "primary.main",
  } satisfies SxProps<Theme>,

  statusChip: {
    borderRadius: "999px",
    fontWeight: 600,
    textTransform: "capitalize",
  } satisfies SxProps<Theme>,
};
