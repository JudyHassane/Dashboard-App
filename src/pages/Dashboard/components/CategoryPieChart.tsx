import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../../store/features/hooks";
import { ui } from "../../../styles/ui";
import { colors } from "../../../styles/colors";
import { dashboardStyles } from "../../../styles/dashboardStyles";

const CategoryPieChart = () => {
  const { categoriesChart } = useAppSelector((state) => state.dashboard);

  const theme = useTheme();

  const classes = dashboardStyles.pieChartCard;

  return (
    <div className={`${classes.container} ${ui.card}`}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        className={classes.title}
      >
        Book Categories
      </Typography>

      <div className={classes.chartWrapper}>
        {categoriesChart.length > 0 ? (
          <PieChart
            className={classes.chart}
            colors={colors.chart}
            series={[
              {
                data: categoriesChart,
                innerRadius: 60,
                outerRadius: 120,
                paddingAngle: 3,
                cornerRadius: 7,
                highlightScope: { fade: "none", highlight: "item" },
                faded: {
                  innerRadius: 50,
                  additionalRadius: -15,
                  color: theme.palette.mode === "dark" ? "#334155" : "#E2E8F0",
                },
                highlighted: {
                  additionalRadius: 5,
                  innerRadius: 60,
                },
              },
            ]}
            slotProps={{
              legend: {
                position: { vertical: "bottom", horizontal: "center" },
              },
            }}
            margin={{ top: 10, bottom: 20, left: 0, right: 0 }}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="body2" color="text.secondary">
              No category data available
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPieChart;
