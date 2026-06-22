import { useNavigate } from "react-router-dom";
import {
  DashboardTable,
  type DashboardTableColumnProps,
} from "../../../components/DashboardTable";
import { useAppSelector } from "../../../store/features/hooks";
import type { RecentBook, TopAuthor } from "../../../types/dashboard.types";
import { formatDate } from "../../../utils/formatters";

const recentBooksColumns: DashboardTableColumnProps<RecentBook>[] = [
  { id: "title", header: "Title", render: (book) => book.title },

  {
    id: "category",
    header: "Category",
    render: (book) => book.category.name,
  },
  {
    id: "dateAdded",
    header: "Date Added",
    align: "right",
    render: (book) => formatDate(book.dateAdded),
  },
];

const authorsColumns: DashboardTableColumnProps<TopAuthor>[] = [
  { id: "id", header: "ID", width: "30%", render: (author) => author.id },
  {
    id: "name",
    header: "Author",
    width: "55%",
    render: (author) => author.name,
  },
  {
    id: "booksCount",
    header: "Books",
    align: "right",
    width: "30%",
    render: (author) => author.booksCount,
  },
];

const DashboardTables = () => {
  const navigate = useNavigate();
  const { recentBooks, topAuthors } = useAppSelector(
    (state) => state.dashboard,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <DashboardTable
        title="Authors"
        data={topAuthors}
        columns={authorsColumns}
      />

      <DashboardTable
        title="Recent Books"
        data={recentBooks}
        columns={recentBooksColumns}
        onRowClick={(book) => navigate(`/books/${book.id}`)}
        onViewAll={() => navigate("/books")}
      />
    </div>
  );
};

export default DashboardTables;
