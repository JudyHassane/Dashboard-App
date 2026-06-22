import { KpisCard } from "../../../components/KpisCard";
import { Library, Users, BookMarked, UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/features/hooks";
import { useEffect } from "react";
import { getDashboardKpis } from "../../../store/features/dashboard/api";

const DashboardKpis = () => {
  const dispatch = useAppDispatch();
  const { kpis } = useAppSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getDashboardKpis());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <KpisCard
        title="Total Books"
        value={kpis.totalBooks}
        recent={
          kpis.booksThisWeek > 0
            ? `+${kpis.booksThisWeek} this week`
            : undefined
        }
        icon={<Library size={22} />}
        variant="indigo"
      />
      <KpisCard
        title="Total Members"
        value=""
        icon={<Users size={22} />}
        variant="emerald"
      />
      <KpisCard
        title="Borrowed Books"
        value=""
        icon={<BookMarked size={22} />}
        variant="red"
      />
      <KpisCard
        title="New Members"
        value=""
        icon={<UserPlus size={22} />}
        variant="violet"
      />
    </div>
  );
};
export default DashboardKpis;
