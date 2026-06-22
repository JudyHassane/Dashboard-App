import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ArrowRight } from "lucide-react";
import { tableStyles } from "../styles/tableStyles";
import { ui } from "../styles/ui";

export interface DashboardTableColumnProps<T> {
  id: string;
  header: string;
  align?: "left" | "right" | "center";
  width?: string | number;
  render: (item: T) => React.ReactNode;
}

interface DashboardTableProps<T> {
  title: string;
  onViewAll?: () => void;

  data: T[];
  columns: DashboardTableColumnProps<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export const DashboardTable = <T extends { id: string | number }>({
  title,
  onViewAll,
  data,
  columns,
  onRowClick,
  emptyMessage = "No data available",
}: DashboardTableProps<T>) => {
  const isEmpty = data.length === 0;

  return (
    <Box sx={tableStyles.wrapper} className={`${ui.card} ${ui.border.primary}`}>
      <Box sx={tableStyles.header}>
        <Typography sx={tableStyles.title}> {title} </Typography>

        {onViewAll && (
          <Button
            size="small"
            endIcon={<ArrowRight size={16} />}
            onClick={onViewAll}
          >
            View All
          </Button>
        )}
      </Box>

      <TableContainer sx={tableStyles.container}>
        <Table>
          {columns.some((c) => c.width) && (
            <colgroup>
              {columns.map((col) => (
                <col key={col.id} style={{ width: col.width }} />
              ))}
            </colgroup>
          )}
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
            {isEmpty ? (
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
    </Box>
  );
};
