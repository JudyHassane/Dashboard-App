export const dashboardStyles = {
  pieChartCard: {
    container: "lg:col-span-3 flex flex-col items-center h-[380px] p-6 w-full",
    title: "self-start w-full mb-2 font-extrabold",
    chartWrapper:
      "w-full h-full flex justify-center overflow-hidden items-center",
    chart: "pie-chart-animated",
  },
  topChoices: {
    container: "space-y-4",
    scrollRow: "flex gap-5 overflow-x-auto pb-4 custom-scrollbar",
    cardWrapper: "flex-shrink-0 w-36 group cursor-pointer",
    imageContainer: `
      w-36 h-52 
      rounded-xl overflow-hidden 
      shadow-sm 
      border border-gray-100 dark:border-slate-700 
      transition-transform duration-200 
      group-hover:-translate-y-1 group-hover:shadow-md 
      bg-slate-200 dark:bg-slate-800
    `,
    imageInner: `
      w-full h-full 
      flex items-center justify-center 
      text-sm text-slate-500 dark:text-slate-400
    `,
  },
  recentActivity: {
    container: `
    lg:col-span-2
    bg-white dark:bg-slate-800
    rounded-2xl
    shadow-sm
    border border-gray-100 dark:border-slate-700
    overflow-hidden
    flex flex-col
    h-[380px]
  `,
    header: "px-5 py-4 flex items-center gap-2",
    icon: "text-indigo-600 dark:text-indigo-400",
    content: "p-5 overflow-y-auto flex-1 custom-scrollbar",
    list: "space-y-5",
    item: "relative flex gap-4",
    line: "absolute left-2 top-7 bottom-[-20px] w-px bg-gray-100 dark:bg-slate-700",
    dotWrapper:
      "relative mt-1 flex h-4 w-4 flex-none items-center justify-center",
    dot: "h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50 dark:ring-indigo-900/30",
    textWrapper: "flex flex-col gap-0.5",
    title:
      "text-sm font-medium text-gray-900 dark:text-slate-100 leading-tight",
    time: "text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase",
  },
} as const;
