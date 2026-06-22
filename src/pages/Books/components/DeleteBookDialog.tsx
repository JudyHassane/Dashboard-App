import { Box } from "@mui/material";
import { booksStyles } from "../../../styles/booksStyles";
import type { Book } from "../../../types";
import AlertDialog from "../../../components/AlertDialog"; // Adjust path accordingly
import { useAppDispatch, useAppSelector } from "../../../store/features/hooks";
import { deleteBook } from "../../../store/features/books/api";
import { toast } from "react-toastify";

interface DeleteBookDialogProps {
  open: boolean;
  bookToDelete: Book | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteBookDialog = ({
  open,
  bookToDelete,
  onClose,
  onSuccess,
}: DeleteBookDialogProps) => {
  const dispatch = useAppDispatch();
  const { actionsStatus } = useAppSelector((state) => state.books);
  const isDeleting = actionsStatus === "loading";

  const description = (
    <>
      Are you sure you want to delete{" "}
      <Box component="span" sx={booksStyles.deleteDialogBookName}>
        "{bookToDelete?.title}"
      </Box>{" "}
      ?
      <Box component="div" sx={{ mt: 1 }}>
        This action cannot be undone.
      </Box>
    </>
  );

  const handleDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete.id))
        .unwrap()
        .then(() => {
          toast.success("Book deleted successfully!");
          onClose();
          if (onSuccess) {
            onSuccess();
          }
        });
    }
  };

  return (
    <AlertDialog
      open={open}
      type="danger"
      title="Delete Book"
      description={description}
      confirmText="Delete"
      loadingText="Deleting..."
      isLoading={isDeleting}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
};

export default DeleteBookDialog;
