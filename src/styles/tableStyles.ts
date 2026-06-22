import type { SxProps, Theme } from "@mui/material";

export const tableStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: 420,
    overflow: "hidden",
  } satisfies SxProps<Theme>,

  header: {
    px: 2.5,
    py: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } satisfies SxProps<Theme>,

  title: {
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "text.primary",
  } satisfies SxProps<Theme>,

  container: {
    flex: 1,
    overflow: "auto",
    px: 2,
    pb: 2,
  } satisfies SxProps<Theme>,

  headerCell: {
    fontWeight: 600,
    fontSize: "0.75rem",
    color: "text.secondary",
    borderBottom: "1px solid",
    borderColor: "divider",
    py: 1.5,
    backgroundColor: "transparent",
  } satisfies SxProps<Theme>,

  bodyCell: {
    color: "text.primary",
    fontSize: "0.875rem",
    fontWeight: 500,
    borderBottom: "1px solid",
    borderColor: "divider",
    py: 2.4,
  } satisfies SxProps<Theme>,

  emptyCell: {
    py: 14,
    borderBottom: "none",
  },

  row: (clickable: boolean) => ({
    transition: "background-color 0.2s ease, transform 0.2s ease",
    cursor: clickable ? "pointer" : "default",
    "&:hover": {
      backgroundColor: "action.hover",
      transform: clickable ? "scale(1.005)" : "none",
    },
    "&:last-child td": {
      borderBottom: "none",
    },
  }),
};
