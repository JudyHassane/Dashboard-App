import type { SxProps, Theme } from "@mui/material";
import { colors } from "./colors";

export const booksStyles = {
  addButton: {
    px: 3,
    py: 1.2,
  } satisfies SxProps<Theme>,

  searchField: {
    flex: { lg: 2 },
  } satisfies SxProps<Theme>,

  filterControl: {
    minWidth: 140,
    flex: 1,
  } satisfies SxProps<Theme>,

  tableSearchField: {
    width: { xs: "100%", sm: 250 },

    "& .MuiOutlinedInput-root": {
      height: 40,
      borderRadius: "12px",
      backgroundColor: "background.default",
      transition: "all 0.2s ease",

      "& fieldset": {
        borderColor: "divider",
      },

      "&:hover": {
        backgroundColor: "action.hover",

        "& fieldset": {
          borderColor: "primary.light",
        },
      },

      "&.Mui-focused": {
        backgroundColor: "background.paper",

        "& fieldset": {
          borderWidth: "1px",
          borderColor: "primary.main",
        },
      },
    },

    "& .MuiInputBase-input": {
      fontSize: "0.875rem",
      fontWeight: 500,
    },

    "& .MuiInputAdornment-root": {
      color: "text.secondary",
    },
  } satisfies SxProps<Theme>,

  table: {
    tableLayout: "fixed",
    width: "100%",
    overflow: "hidden",
  } satisfies SxProps<Theme>,

  tableCard: {
    backgroundColor: "background.paper",
    borderRadius: "18px",
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    overflow: "hidden",
  } satisfies SxProps<Theme>,

  tableContainer: {
    maxHeight: 700,
  } satisfies SxProps<Theme>,

  tableHeaderCell: {
    fontWeight: "bold",
    color: "text.secondary",
    backgroundColor: "transparent",
    overflow: "hidden",
  } satisfies SxProps<Theme>,

  tableHeaderCellWithWidth: (width: number) =>
    ({
      ...booksStyles.tableHeaderCell,
      width,
    }) satisfies SxProps<Theme>,

  tableHeaderLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.5,
    minWidth: 0,
    maxWidth: "100%",
  } satisfies SxProps<Theme>,

  sortLabelInactive: {
    "& .MuiTableSortLabel-icon": {
      opacity: 0.3,
    },
  } satisfies SxProps<Theme>,

  sortLabelActive: {
    "& .MuiTableSortLabel-icon": {
      opacity: 1,
      color: "primary.main",
    },
  } satisfies SxProps<Theme>,

  filterHeaderCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.25,
  } satisfies SxProps<Theme>,

  filterIconButton: {
    p: 0.35,
    color: "text.disabled",
    "&:hover": {
      color: "text.secondary",
    },
  } satisfies SxProps<Theme>,

  filterIconButtonActive: {
    p: 0.35,
    color: "primary.main",
    "&:hover": {
      color: "primary.dark",
    },
  } satisfies SxProps<Theme>,

  filterMenu: {
    "& .MuiPaper-root": {
      borderRadius: "12px",
      minWidth: 160,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
    },
  } satisfies SxProps<Theme>,

  filterMenuItemText: {
    textTransform: "capitalize",
  } satisfies SxProps<Theme>,

  filterMenuSelectedIcon: {
    minWidth: "auto",
    ml: 1,
  } satisfies SxProps<Theme>,

  paginationFooter: {
    borderTop: "1px solid",
    borderColor: "divider",
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === "dark"
        ? theme.palette.background.paper
        : theme.palette.background.default,
    px: 2,
    "& .MuiTablePagination-toolbar": {
      minHeight: 56,
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
      fontSize: "0.8125rem",
      fontWeight: 500,
      color: "text.secondary",
    },
    "& .MuiTablePagination-select": {
      fontSize: "0.8125rem",
      fontWeight: 600,
      color: "text.primary",
    },
    "& .MuiTablePagination-actions button": {
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "divider",
      color: "text.primary",
      mx: 0.25,
      backgroundColor: "background.paper",
      "&:hover": {
        backgroundColor: "action.hover",
      },
      "&.Mui-disabled": {
        borderColor: "transparent",
        color: "text.disabled",
      },
    },
  } satisfies SxProps<Theme>,

  tableBodyRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": { backgroundColor: "action.hover" },
  } satisfies SxProps<Theme>,

  tableBodyRowClickable: {
    cursor: "pointer",
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": { backgroundColor: "action.hover" },
  } satisfies SxProps<Theme>,

  tableHeaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 2,
    px: 3,
    py: 2,
    borderBottom: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },

  tableHeaderTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "text.primary",
  },

  coverImageFrame: {
    width: 48,
    height: 64,
    borderRadius: 0.5,
    boxShadow: 1,
    overflow: "hidden",
    flexShrink: 0,
    textAlign: "center",
  } satisfies SxProps<Theme>,

  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  } satisfies SxProps<Theme>,

  isbnBadge: {
    display: "inline-block",
    px: 1,
    py: 0.5,
    borderRadius: 0.5,
    fontSize: "0.75rem",
    fontFamily: "monospace",
    color: "text.secondary",
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === "dark"
        ? theme.palette.action.hover
        : theme.palette.grey[100],
  } satisfies SxProps<Theme>,

  titleAuthorCell: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  } satisfies SxProps<Theme>,

  bookTitle: {
    fontWeight: 600,
    color: "text.primary",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies SxProps<Theme>,

  bookAuthor: {
    mt: 0.5,
    fontSize: "0.75rem",
    color: "text.secondary",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies SxProps<Theme>,

  categoryText: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "text.secondary",
  } satisfies SxProps<Theme>,

  primaryCellText: {
    fontWeight: 500,
    color: "text.primary",
  } satisfies SxProps<Theme>,

  secondaryCellText: {
    fontSize: "0.875rem",
    color: "text.secondary",
  } satisfies SxProps<Theme>,

  tableStatusChip: {
    textTransform: "capitalize",
  } satisfies SxProps<Theme>,

  tableActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
  } satisfies SxProps<Theme>,

  editActionButton: {
    color: "primary.main",
    "&:hover": { backgroundColor: "primary.50" },
  } satisfies SxProps<Theme>,

  deleteActionButton: {
    color: "error.main",
    "&:hover": { backgroundColor: "error.50" },
  } satisfies SxProps<Theme>,

  formDialogPaper: {
    maxWidth: "500px",
    borderRadius: "18px",
    overflow: "hidden",
  } satisfies SxProps<Theme>,

  formDialogHeader: {
    px: 4,
    py: 2,
    background: `linear-gradient(135deg, ${colors.dialog.headerGradientStart} 0%, ${colors.dialog.headerGradientEnd} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } satisfies SxProps<Theme>,

  formDialogHeaderIcon: {
    p: 1,
    borderRadius: "12px",
    backgroundColor: colors.dialog.headerIconBg,
    backdropFilter: "blur(8px)",
    display: "flex",
    color: "white",
  } satisfies SxProps<Theme>,

  formDialogHeaderTitle: {
    fontWeight: 700,
    color: "white",
    lineHeight: 1.3,
  } satisfies SxProps<Theme>,

  formDialogHeaderSubtitle: {
    color: colors.dialog.headerSubtitle,
  } satisfies SxProps<Theme>,

  formDialogCloseButton: {
    color: "white",
    "&:hover": { backgroundColor: colors.dialog.closeButtonHover },
  } satisfies SxProps<Theme>,

  formDialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    pt: 3,
    pb: 1,
    py: 4,
    px: 4,
    maxHeight: "60vh",
    overflow: "auto",
  } satisfies SxProps<Theme>,

  formFieldRow: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gap: 4,
  } satisfies SxProps<Theme>,

  formFieldRowThreeCol: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
    gap: 3,
    alignItems: "start",
  } satisfies SxProps<Theme>,

  formDialogActions: {
    px: 3,
    pb: 3,
    pt: 1,
    justifyContent: "flex-end",
  } satisfies SxProps<Theme>,

  dialogCancelButton: {
    borderRadius: "12px",
    px: 3,
    // color: "text.secondary",
    "&:hover": {
      backgroundColor: "action.hover",
    },
  } satisfies SxProps<Theme>,

  formSubmitButton: {
    borderRadius: "12px",
    px: 4.5,
  } satisfies SxProps<Theme>,

  statusChip: {
    fontWeight: "bold",
    width: "100%",
    height: 40,
    fontSize: "0.85rem",
  } satisfies SxProps<Theme>,

  deleteDialogPaper: {
    borderRadius: "20px",
  } satisfies SxProps<Theme>,

  deleteDialogContent: {
    p: 4,
    textAlign: "center",
  } satisfies SxProps<Theme>,

  deleteDialogIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 2,
  } satisfies SxProps<Theme>,

  deleteDialogIcon: {
    display: "flex",
  } satisfies SxProps<Theme>,

  deleteDialogTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "text.primary",
    mb: 1,
  } satisfies SxProps<Theme>,

  deleteDialogDescription: {
    color: "text.secondary",
    mb: 3,
    lineHeight: 1.6,
  } satisfies SxProps<Theme>,

  deleteDialogBookName: {
    fontWeight: 700,
    color: "text.primary",
  } satisfies SxProps<Theme>,

  deleteDialogActions: {
    display: "flex",
    justifyContent: "center",
    gap: 1.5,
  } satisfies SxProps<Theme>,

  imageToggleGroup: {
    mb: 1.5,
  } satisfies SxProps<Theme>,

  imageToggleButton: {
    textTransform: "none",
    fontSize: "0.8rem",
  } satisfies SxProps<Theme>,

  imageDropzone: (hasPreview: boolean, hasError: boolean) =>
    ({
      border: hasPreview ? "none" : "2px dashed",
      borderColor: hasError ? "error.main" : "divider",
      borderRadius: "12px",
      p: hasPreview ? 0 : 3,
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      overflow: "hidden",
      width: 140,
      height: 200,
      mx: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        borderColor: "primary.main",
        backgroundColor: "action.hover",
      },
    }) satisfies SxProps<Theme>,

  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  } satisfies SxProps<Theme>,

  imageDropzoneHint: {
    fontSize: "0.65rem",
  } satisfies SxProps<Theme>,

  imageUploadError: {
    mt: 0.5,
    ml: 1.5,
  } satisfies SxProps<Theme>,
};
