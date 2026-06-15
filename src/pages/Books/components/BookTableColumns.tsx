import { type ColumnDef } from "@tanstack/react-table";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import type { Book } from "../../../types";
import { booksStyles } from "../../../styles/booksStyles";
import { formatDate } from "../../../utils/formatters";
import { Pencil, Trash2 } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUrl";

const columnWidths = {
  cover: 86,
  isbn: 150,
  title: 220,
  category: 145,
  price: 105,
  stock: 95,
  status: 145,
  dateAdded: 140,
  actions: 105,
} as const;

const StatusChip = ({ status }: { status: string }) => {
  const isAvailable = status === "available";

  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      color={isAvailable ? "success" : "error"}
      sx={booksStyles.tableStatusChip}
    />
  );
};

export const getBooksColumns = (
  onEditBook: (book: Book) => void,
  onDeleteBook: (book: Book) => void,
): ColumnDef<Book>[] => [
  {
    header: "Cover",
    accessorKey: "coverImage",
    size: columnWidths.cover,
    enableSorting: false,
    cell: ({ row }) => (
      <Box sx={booksStyles.coverImageFrame}>
        <Box
          component="img"
          src={getImageUrl(row.original.coverImage)}
          alt={row.original.title}
          sx={booksStyles.coverImage}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "";
          }}
        />
      </Box>
    ),
  },

  {
    header: "ISBN",
    accessorKey: "isbn",
    size: columnWidths.isbn,
    enableSorting: false,
    cell: ({ row }) => (
      <Box component="span" sx={booksStyles.isbnBadge}>
        {row.original.isbn}
      </Box>
    ),
  },

  {
    header: "Title & Author",
    accessorKey: "title",
    size: columnWidths.title,
    enableSorting: true,
    cell: ({ row }) => (
      <Box sx={booksStyles.titleAuthorCell}>
        <Box component="span" sx={booksStyles.bookTitle}>
          {row.original.title}
        </Box>
        <Box component="span" sx={booksStyles.bookAuthor}>
          {row.original.author.name}
        </Box>
      </Box>
    ),
  },

  {
    header: "Category",
    id: "category",
    size: columnWidths.category,
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ row }) => (
      <Box component="span" sx={booksStyles.categoryText}>
        {row.original.category.name}
      </Box>
    ),
    meta: {
      asyncFilter: true,
    },
  },

  {
    header: "Price",
    accessorKey: "price",
    size: columnWidths.price,
    cell: ({ row }) => (
      <Box component="span" sx={booksStyles.primaryCellText}>
        ${Number(row.original.price).toFixed(2)}
      </Box>
    ),
  },

  {
    header: "Stock",
    accessorKey: "stock",
    size: columnWidths.stock,
    cell: ({ row }) => (
      <Box component="span" sx={booksStyles.primaryCellText}>
        {row.original.stock}
      </Box>
    ),
  },

  {
    header: "Status",
    accessorKey: "status",
    size: columnWidths.status,
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ row }) => <StatusChip status={row.original.status} />,
    meta: {
      filterOptions: ["available", "out of stock"],
    },
  },

  {
    header: "Date Added",
    accessorKey: "dateAdded",
    size: columnWidths.dateAdded,
    cell: ({ row }) => (
      <Box component="span" sx={booksStyles.secondaryCellText}>
        {formatDate(row.original.dateAdded)}
      </Box>
    ),
  },

  {
    header: "Actions",
    id: "actions",
    size: columnWidths.actions,
    meta: {
      align: "center",
    },
    cell: ({ row }) => (
      <Box sx={booksStyles.tableActions}>
        <Tooltip title="Edit book">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEditBook(row.original);
            }}
            sx={booksStyles.editActionButton}
          >
            <Pencil size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete book">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteBook(row.original);
            }}
            sx={booksStyles.deleteActionButton}
          >
            <Trash2 size={18} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];
