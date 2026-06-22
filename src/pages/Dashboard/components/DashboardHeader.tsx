import PageHeader from "../../../components/PageHeader";
import { useCurrentTime as useCurrentTime } from "../../../hooks/useCurrentTime";
import { useAppSelector } from "../../../store/features/hooks";
import { ui } from "../../../styles/ui";
import {
  formatDashboardDate,
  formatDashboardDayTime,
} from "../../../utils/formatters";

const DashboardHeader = () => {
  const user = useAppSelector((state) => state.auth.user);

  const now = useCurrentTime();
  const formattedDate = formatDashboardDate(now);
  const formattedDayTime = formatDashboardDayTime(now);

  return (
    <PageHeader
      title={
        <>
          <span className={ui.text.primary}>Hello, </span>
          <span className={ui.text.brand}>{user?.name}!</span>
        </>
      }
      subtitle={
        <p className={`${ui.text.primary} text-sm font-semibold mt-1`}>
          {formattedDate} | {formattedDayTime}
        </p>
      }
    />
  );
};

export default DashboardHeader;
