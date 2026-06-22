import { Typography } from "@mui/material";
import { Clock } from "lucide-react";
import { dashboardStyles } from "../../../styles/dashboardStyles";
import { useAppSelector } from "../../../store/features/hooks";
import { formatRelativeTime } from "../../../utils/formatters";

const RecentActivity = () => {
  const { recentActivities } = useAppSelector((state) => state.dashboard);

  return (
    <div className={dashboardStyles.recentActivity.container}>
      <div className={dashboardStyles.recentActivity.header}>
        <Clock size={18} className={dashboardStyles.recentActivity.icon} />

        <Typography variant="subtitle1" fontWeight="bold">
          Recent Activity
        </Typography>
      </div>

      <div className={dashboardStyles.recentActivity.content}>
        <div className={dashboardStyles.recentActivity.list}>
          {recentActivities.map((activity, index) => {
            const isLast = index === recentActivities.length - 1;

            return (
              <div
                key={activity.id}
                className={dashboardStyles.recentActivity.item}
              >
                {!isLast && (
                  <div className={dashboardStyles.recentActivity.line} />
                )}

                <div className={dashboardStyles.recentActivity.dotWrapper}>
                  <div className={dashboardStyles.recentActivity.dot} />
                </div>

                <div className={dashboardStyles.recentActivity.textWrapper}>
                  <p className={dashboardStyles.recentActivity.title}>
                    {activity.message}
                  </p>

                  <p className={dashboardStyles.recentActivity.time}>
                    {formatRelativeTime(activity.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
