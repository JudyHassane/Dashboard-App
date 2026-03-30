import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableStyles } from "../styles/tableStyles";

export interface DashboardTableColumnProps<T> {
  id: string;
  header: string;
  align?: "left" | "right" | "center";
  render: (item: T) => React.ReactNode;
}

interface DashboardTableProps<T> {
  data: T[];
  columns: DashboardTableColumnProps<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export const DashboardTable = <T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  emptyMessage = "No data available",
}: DashboardTableProps<T>) => {
  return (
    <TableContainer sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align ?? "left"}
                sx={tableStyles.headerCell}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
                sx={tableStyles.emptyCell}
              >
                <Typography variant="body2" color="text.secondary">
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick?.(item)}
                sx={tableStyles.row(!!onRowClick)}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align ?? "left"}
                    sx={tableStyles.bodyCell}
                  >
                    {col.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
