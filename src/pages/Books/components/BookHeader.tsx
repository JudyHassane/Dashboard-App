import { Button } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import { Plus } from "lucide-react";
import { booksStyles } from "../../../styles/booksStyles";
import { bookDialogRef } from "../../../constants/refs";

const BookHeader = () => {
  return (
    <PageHeader
      title="All Books"
      subtitle="Manage your complete bookstore inventory"
      action={
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={20} />}
          sx={booksStyles.addButton}
          onClick={() => bookDialogRef.current?.()}
        >
          Add New Book
        </Button>
      }
    />
  );
};

export default BookHeader;
