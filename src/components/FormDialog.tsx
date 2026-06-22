import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import type { ReactNode, SubmitEventHandler } from "react";
import { booksStyles } from "../styles/booksStyles";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;

  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;

  isSubmitting?: boolean;
  isCancelDisabled?: boolean;
  isSubmitDisabled?: boolean;

  submitLabel: string;
  loadingSubmitLabel?: string;
}

const FormDialog = ({
  open,
  onClose,
  onSubmit,

  title,
  subtitle,
  icon,
  children,

  isSubmitting = false,
  isCancelDisabled = false,
  isSubmitDisabled = false,

  submitLabel,
  loadingSubmitLabel,
}: FormDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      slotProps={{
        paper: {
          sx: booksStyles.formDialogPaper,
        },
      }}
    >
      <form onSubmit={onSubmit} noValidate>
        <Box sx={booksStyles.formDialogHeader}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {icon && <Box sx={booksStyles.formDialogHeaderIcon}>{icon}</Box>}

            <Box>
              <Typography
                variant="subtitle1"
                sx={booksStyles.formDialogHeaderTitle}
              >
                {title}
              </Typography>

              {subtitle && (
                <Typography
                  variant="caption"
                  sx={booksStyles.formDialogHeaderSubtitle}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            sx={booksStyles.formDialogCloseButton}
          >
            <X size={20} />
          </IconButton>
        </Box>

        <DialogContent sx={booksStyles.formDialogContent}>
          {children}
        </DialogContent>

        <DialogActions sx={booksStyles.formDialogActions}>
          <Button
            onClick={onClose}
            variant="text"
            disabled={isCancelDisabled}
            sx={booksStyles.dialogCancelButton}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitDisabled}
            startIcon={
              isSubmitting ? (
                <CircularProgress color="inherit" size={16} />
              ) : undefined
            }
            sx={booksStyles.formSubmitButton}
          >
            {isSubmitting ? (loadingSubmitLabel ?? submitLabel) : submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
