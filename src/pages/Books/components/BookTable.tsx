import { useCallback, useEffect, useMemo, useState } from "react";
import BookFormDialog from "./BookFormDialog";
import type { Book, SortByField, SortOrder } from "../../../types";
import { bookDialogRef } from "../../../constants/refs";
import DataTable from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../store/features/hooks";
import { getBooksColumns } from "./BookTableColumns";
import { getBooks, getCategories } from "../../../store/features/books/api";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useDebounce } from "../../../hooks/useDebounce";
import DeleteBookDialog from "./DeleteBookDialog";
import { useNavigate } from "react-router-dom";

const BookTable = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { books, pagination, categories, fetchBooksStatus } = useAppSelector(
    (state) => state.books,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [categorySearch, setCategorySearch] = useState("");
  const debouncedCategorySearch = useDebounce(categorySearch);

  const [sorting, setSorting] = useState<SortingState>([
    { id: "dateAdded", desc: true },
  ]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const openDialog = useCallback((book?: Book) => {
    setSelectedBook(book || null);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedBook(null);
  }, []);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const openDeleteDialog = useCallback((book: Book) => {
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setBookToDelete(null);
  }, []);

  useEffect(() => {
    bookDialogRef.current = openDialog;
  }, [openDialog]);

  const loadCategories = useCallback(
    (searchStr = "", pageNumber = 1) => {
      dispatch(
        getCategories({
          searchQuery: searchStr,
          pageNumber,
          pageSize: 4,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (debouncedCategorySearch.trim() !== "" || categorySearch === "") {
      loadCategories(debouncedCategorySearch, 1);
    }
  }, [debouncedCategorySearch, categorySearch, loadCategories]);

  const columns = useMemo(
    () => getBooksColumns(openDialog, openDeleteDialog),
    [openDialog, openDeleteDialog],
  );

  const fetchBooks = useCallback(
    (
      pageNumber = pagination.pageNumber,
      pageSize = pagination.pageSize,
      currentFilters = columnFilters,
    ) => {
      const activeSort = sorting[0];
      const categoryFilter = currentFilters.find((f) => f.id === "category")
        ?.value as string | undefined;
      const statusFilter = currentFilters.find((f) => f.id === "status")
        ?.value as string | undefined;

      dispatch(
        getBooks({
          pageNumber,
          pageSize,
          searchQuery: debouncedSearchQuery || undefined,
          sortBy: activeSort?.id as SortByField,
          sortOrder: activeSort?.desc ? "desc" : ("asc" as SortOrder),
          category: categoryFilter,
          status: statusFilter,
        }),
      );
    },
    [
      dispatch,
      pagination.pageNumber,
      pagination.pageSize,
      sorting,
      columnFilters,
      debouncedSearchQuery,
    ],
  );

  useEffect(() => {
    fetchBooks(1, pagination.pageSize, columnFilters);
  }, [sorting, columnFilters, debouncedSearchQuery]);

  const onPaginationChange = (page: number) => {
    fetchBooks(page, pagination.pageSize, columnFilters);
  };

  const onSelectChange = (pageSize: number) => {
    fetchBooks(1, pageSize, columnFilters);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={books}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        paginationData={{
          total: pagination.totalItems,
          pageIndex: pagination.pageNumber,
          pageSize: pagination.pageSize,
        }}
        onPaginationChange={onPaginationChange}
        onPageSizeChange={onSelectChange}
        searchConfig={{
          value: searchQuery,
          placeholder: "Search title or ISBN...",
          onChange: setSearchQuery,
        }}
        dynamicFilters={{
          category: {
            options: categories.map((category) => category.name),
            searchValue: categorySearch,
            placeholder: "Search categories",
            onOpen: () => {
              setCategorySearch("");
              loadCategories("", 1);
            },
            onSearchChange: (value) => {
              setCategorySearch(value);
            },
          },
        }}
        isLoading={fetchBooksStatus === "loading"}
        onRowClick={(book) => navigate(`/books/${book.id}`)}
      />
      <BookFormDialog
        dialogIsOpen={isDialogOpen}
        onDialogClose={closeDialog}
        selectedBook={selectedBook}
        type={selectedBook ? "edit" : "add"}
      ></BookFormDialog>

      <DeleteBookDialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        bookToDelete={bookToDelete}
        onSuccess={fetchBooks}
      ></DeleteBookDialog>
    </>
  );
};

export default BookTable;
