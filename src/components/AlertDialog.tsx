import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { booksStyles } from "../styles/booksStyles";
import { colors } from "../styles/colors";

export type DialogType = "danger" | "success" | "info";

interface AlertDialog {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  type: DialogType;

  title: string;
  description: React.ReactNode;
  confirmText: string;

  loadingText?: string;
  isLoading?: boolean;
}

const typeConfigs = {
  danger: {
    color: "error" as const,
    icon: <X size={32} />,
    iconColor: colors.error.main,
    iconBg: colors.error.light,
  },
  success: {
    color: "success" as const,
    icon: <CheckCircle2 size={32} />,
    iconColor: colors.success.main,
    iconBg: colors.success.light,
  },
  info: {
    color: "info" as const,
    icon: <AlertCircle size={32} />,
    iconColor: colors.info.main,
    iconBg: colors.info.light,
  },
};

const AlertDialog = ({
  open,
  onClose,
  onConfirm,
  type,
  title,
  description,
  confirmText,
  loadingText,
  isLoading = false,
}: AlertDialog) => {
  const config = typeConfigs[type];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: booksStyles.deleteDialogPaper } }}
    >
      <Box sx={booksStyles.deleteDialogContent}>
        <Box
          sx={{
            ...booksStyles.deleteDialogIconWrapper,
            bgcolor: config.iconBg,
          }}
        >
          <Box
            sx={{
              ...booksStyles.deleteDialogIcon,
              color: config.iconColor,
            }}
          >
            {config.icon}
          </Box>
        </Box>

        <Typography sx={booksStyles.deleteDialogTitle}>{title}</Typography>

        <Typography sx={booksStyles.deleteDialogDescription}>
          {description}
        </Typography>

        <Box sx={booksStyles.deleteDialogActions}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            disabled={isLoading}
            sx={booksStyles.dialogCancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color={config.color}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress color="inherit" size={16} />
              ) : undefined
            }
            sx={booksStyles.dialogCancelButton}
          >
            {isLoading ? loadingText : confirmText}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AlertDialog;
