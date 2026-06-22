import { KpisCard } from "../../../components/KpisCard";
import { CheckCircle, DollarSign, Library, XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/features/hooks";
import { useEffect } from "react";
import { getBookStats } from "../../../store/features/books/api";

const BookKpis = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector((state) => state.books);
  useEffect(() => {
    dispatch(getBookStats());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <KpisCard
        title="Total Books"
        value={stats.totalBooks}
        recent={
          stats.booksThisWeek > 0
            ? `+${stats.booksThisWeek} this week`
            : undefined
        }
        icon={<Library size={22} />}
        variant="indigo"
      />
      <KpisCard
        title="Available"
        value={stats.availableBooks}
        icon={<CheckCircle size={22} />}
        variant="emerald"
      />
      <KpisCard
        title="Out of Stock"
        value={stats.outOfStockBooks}
        icon={<XCircle size={22} />}
        variant="red"
      />
      <KpisCard
        title="Total Value"
        value={stats.totalValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })}
        icon={<DollarSign size={22} />}
        variant="violet"
      />
    </div>
  );
};
export default BookKpis;
