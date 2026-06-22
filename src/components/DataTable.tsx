import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { booksStyles } from "../styles/booksStyles";
import SelectMenu from "./SelectMenu";
import SearchInput from "./SearchInput";
import Loading from "./draft/Loading";

type SearchConfig = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

type PaginationData = {
  total: number;
  pageIndex: number;
  pageSize: number;
};

type DynamicFilterConfig = {
  options: string[];
  searchValue: string;
  placeholder?: string;
  onOpen?: () => void;
  onSearchChange: (value: string) => void;
};

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchConfig?: SearchConfig;
  dynamicFilters?: Record<string, DynamicFilterConfig>;
  onRowClick?: (row: TData) => void;
  onPaginationChange: (page: number) => void;
  paginationData: PaginationData;
  onPageSizeChange: (pageSize: number) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  isLoading?: boolean;
};

const DataTable = <TData,>({
  data,
  columns,
  searchConfig,
  dynamicFilters,
  onRowClick,
  onPaginationChange,
  paginationData,
  onPageSizeChange,
  sorting,
  onSortingChange,
  columnFilters,
  onColumnFiltersChange,
  isLoading = false,
}: DataTableProps<TData>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilterColumnId, setActiveFilterColumnId] = useState<
    string | null
  >(null);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(table.getState().sorting)
          : updater;
      onSortingChange?.(next);
    },
    onColumnFiltersChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(table.getState().columnFilters)
          : updater;
      onColumnFiltersChange?.(next);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualFiltering: true,
    enableSortingRemoval: false,
  });

  const activeColumn = activeFilterColumnId
    ? table.getColumn(activeFilterColumnId)
    : undefined;

  const dynamicFilter = activeFilterColumnId
    ? dynamicFilters?.[activeFilterColumnId]
    : undefined;

  const filterOptions = useMemo(() => {
    return (
      dynamicFilter?.options ??
      activeColumn?.columnDef.meta?.filterOptions ??
      []
    );
  }, [dynamicFilter, activeColumn]);

  const selectMenuOptions = useMemo(() => {
    return filterOptions.map((opt) => ({ label: opt, value: opt }));
  }, [filterOptions]);

  const handleFilterClick = (
    event: React.MouseEvent<HTMLElement>,
    columnId: string,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveFilterColumnId(columnId);
    dynamicFilters?.[columnId]?.onOpen?.();
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setActiveFilterColumnId(null);
  };

  return (
    <>
      <Box sx={booksStyles.tableCard}>
        <Box sx={booksStyles.tableHeaderContainer}>
          {searchConfig && (
            <SearchInput
              value={searchConfig.value}
              onChange={searchConfig.onChange}
              placeholder={searchConfig.placeholder}
              sx={booksStyles.tableSearchField}
            />
          )}
        </Box>
        <TableContainer sx={booksStyles.tableContainer}>
          <Table stickyHeader aria-label="books table" sx={booksStyles.table}>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta;
                    const canSort = header.column.getCanSort();
                    const hasFilter = meta?.filterOptions || meta?.asyncFilter;
                    const align = meta?.align ?? "left";

                    return (
                      <TableCell
                        key={header.id}
                        align={align}
                        onClick={header.column.getToggleSortingHandler()}
                        sx={{
                          width: header.column.columnDef.size,
                          cursor: canSort ? "pointer" : "default",
                          backgroundColor: "background.paper",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                              align === "center" ? "center" : "flex-start",
                            gap: 0.5,
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {canSort && (
                            <TableSortLabel
                              active={header.column.getIsSorted() !== false}
                              direction={
                                header.column.getIsSorted() === "asc"
                                  ? "asc"
                                  : "desc"
                              }
                            />
                          )}

                          {hasFilter && (
                            <IconButton
                              size="small"
                              onClick={(e) =>
                                handleFilterClick(e, header.column.id)
                              }
                              color={
                                header.column.getIsFiltered()
                                  ? "primary"
                                  : "default"
                              }
                              sx={{ ml: 0.5 }}
                            >
                              <FilterListIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} sx={{ border: 0 }}>
                    <Loading />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={
                      onRowClick ? booksStyles.tableBodyRowClickable : undefined
                    }
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.column.columnDef.meta?.align ?? "left"}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={paginationData.total}
          page={paginationData.pageIndex - 1}
          rowsPerPage={paginationData.pageSize}
          onPageChange={(_, newPage) => onPaginationChange(newPage + 1)}
          onRowsPerPageChange={(e) => onPageSizeChange(Number(e.target.value))}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={booksStyles.paginationFooter}
        />
      </Box>

      <SelectMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
        options={selectMenuOptions}
        selectedValue={activeColumn?.getFilterValue() as string | undefined}
        onSelect={(value) =>
          activeFilterColumnId &&
          table.getColumn(activeFilterColumnId)?.setFilterValue(value)
        }
        searchValue={dynamicFilter?.searchValue}
        searchPlaceholder={dynamicFilter?.placeholder}
        onSearchChange={dynamicFilter?.onSearchChange}
      />
    </>
  );
};

export default DataTable;
