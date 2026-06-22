import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
        contrastText: "#fff",
      },

      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
        contrastText: "#fff",
      },

      background: {
        default:
          mode === "light"
            ? colors.background.default.light
            : colors.background.default.dark,

        // cards, dialogues, surfaces
        paper:
          mode === "light"
            ? colors.background.paper.light
            : colors.background.paper.dark,
      },

      text: {
        primary:
          mode === "light"
            ? colors.text.primary.light
            : colors.text.primary.dark,

        secondary:
          mode === "light"
            ? colors.text.secondary.light
            : colors.text.secondary.dark,
      },

      error: {
        main: colors.error.main,
      },

      success: {
        main: colors.success.main,
      },
    },

    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

      h6: {
        fontWeight: 700,
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            borderBottom: "1px solid",
            borderColor:
              mode === "light" ? colors.border.light : colors.border.dark,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none" as const,
            fontWeight: 600,
            borderRadius: 12,
            boxShadow: "none",

            "&:hover": {
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            },
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
          },
        },
        defaultProps: {
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: colors.dialog.backdrop,
                backdropFilter: "blur(8px)",
              },
            },
          },
        },
      },

      MuiDialogContent: {
        styleOverrides: {
          root: {
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor:
                mode === "light"
                  ? colors.dialog.scrollbar.track.light
                  : colors.dialog.scrollbar.track.dark,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor:
                mode === "light"
                  ? colors.dialog.scrollbar.thumb.light
                  : colors.dialog.scrollbar.thumb.dark,
              borderRadius: 3,
              "&:hover": {
                backgroundColor:
                  mode === "light"
                    ? colors.dialog.scrollbar.thumbHover.light
                    : colors.dialog.scrollbar.thumbHover.dark,
              },
            },
            scrollbarWidth: "thin",
            scrollbarColor:
              mode === "light"
                ? `${colors.dialog.scrollbar.thumb.light} ${colors.dialog.scrollbar.track.light}`
                : `${colors.dialog.scrollbar.thumb.dark} ${colors.dialog.scrollbar.track.dark}`,
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              transition: "all 0.2s ease",

              "&:hover:not(.Mui-focused):not(.Mui-error) fieldset": {
                borderColor: colors.primary.light,
              },
            },

            "& .MuiInputBase-input::placeholder": {
              fontSize: "0.8rem",
              opacity: 0.5,
            },
          },
        },
      },

      MuiPagination: {
        styleOverrides: {
          root: {
            "& .MuiPaginationItem-root": {
              borderRadius: 10,
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === "light" ? "#1E293B" : "#FFFFFF",
            color: mode === "light" ? "#F8FAFC" : "#0F172A",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "8px 12px",
            borderRadius: "8px",
            boxShadow:
              mode === "light"
                ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                : "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)",
          },
          arrow: {
            color: mode === "light" ? "#1E293B" : "#FFFFFF",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            maxWidth: "100%",
            height: 28,
            borderRadius: 8,
            fontSize: "0.75rem",
            fontWeight: 600,
          },

          label: {
            paddingLeft: 10,
            paddingRight: 10,
          },
        },

        variants: [
          {
            props: { color: "success", variant: "outlined" },

            style: {
              borderColor:
                mode === "light"
                  ? colors.statusChip.available.light.border
                  : colors.statusChip.available.dark.border,

              backgroundColor:
                mode === "light"
                  ? colors.statusChip.available.light.background
                  : colors.statusChip.available.dark.background,

              color:
                mode === "light"
                  ? colors.statusChip.available.light.text
                  : colors.statusChip.available.dark.text,
            },
          },

          {
            props: { color: "error", variant: "outlined" },

            style: {
              borderColor:
                mode === "light"
                  ? colors.statusChip.unavailable.light.border
                  : colors.statusChip.unavailable.dark.border,

              backgroundColor:
                mode === "light"
                  ? colors.statusChip.unavailable.light.background
                  : colors.statusChip.unavailable.dark.background,

              color:
                mode === "light"
                  ? colors.statusChip.unavailable.light.text
                  : colors.statusChip.unavailable.dark.text,
            },
          },
        ],
      },
    },
  });
