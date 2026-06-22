import CategoryPieChart from "../components/CategoryPieChart";
import DashboardHeader from "../components/DashboardHeader";
import DashboardKpis from "../components/DashboardKpis";
import RecentActivity from "../components/RecentActivity";
import TopChoicesSection from "../components/TopChoicesList";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/features/hooks";
import { getDashboardData } from "../../../store/features/dashboard/api";
import DashboardTables from "../components/DashboardTables";
const DashboardScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardKpis />
      <DashboardTables />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <CategoryPieChart />
        <RecentActivity />
      </div>

      <TopChoicesSection />
    </div>
  );
};

export default DashboardScreen;
