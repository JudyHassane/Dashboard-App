export const ui = {
  card: `
    bg-white 
    dark:bg-slate-800 
    rounded-2xl 
    shadow-sm
  `,
  layout: {
    base: "bg-gray-50 dark:bg-slate-900 rounded-lg",
    surface: "bg-white dark:bg-slate-800",
    roundedContainer: "rounded-2xl",
  },
  text: {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-500 dark:text-slate-400",
    muted: "text-gray-400 dark:text-slate-500",
    brand: "text-indigo-600 dark:text-indigo-400",
    heading: "text-gray-900 dark:text-white font-bold",
    caption: "text-gray-400 dark:text-slate-500 text-xs",
  },

  border: {
    primary: "border border-gray-100 dark:border-slate-700",
    subtle: "border border-gray-50 dark:border-slate-800",
  },

  nav: {
    button:
      "flex items-center justify-center p-2 rounded-xl transition-all duration-200",
    active: "bg-[color:var(--color-primary-main)] text-white shadow-md",
    hover:
      "hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-slate-300",
  },

  app: {
    contentWrapper: "p-6 md:p-8 max-w-7xl mx-auto",
    header:
      "sticky top-0 z-20 px-6 py-4 flex items-center justify-between transition-colors",
    headerActions: "w-48 flex-shrink-0 flex items-center justify-end gap-3",
    headerPageTitle: "text-lg",
    headerSection: "w-48 flex-shrink-0",
    mainContent: "flex-1 min-w-0 flex flex-col overflow-auto",
    pageContent: "flex-1",
    searchContainer: "flex-1 flex justify-center px-6",
    searchIcon: "absolute left-4 top-1/2 -translate-y-1/2",
    searchInput:
      "w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-slate-700 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border border-transparent focus:border-indigo-500/50 transition-all shadow-sm",
    searchInputWrapper: "relative w-full max-w-lg",
    sidebar: "w-18 flex flex-col h-screen sticky top-0 transition-colors",
    sidebarFooter: "flex flex-col items-center pb-8 px-2",
    sidebarLogo: "flex items-center justify-center py-6",
    sidebarLogoText: "text-xs font-black tracking-tighter",
    sidebarNav: "flex-1 flex flex-col items-center gap-10 py-12 px-2",
    suggestionsDropdown:
      "absolute top-full left-0 right-0 mt-2 py-2 overflow-hidden rounded-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200",
    suggestionItem:
      "w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group",
  },
};

// Dashboard UI Cards Variants for dynamic styling
export const cardVariants = {
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-900/30",
    icon: "text-indigo-600 dark:text-indigo-400",
    accent: "border-indigo-500 dark:border-indigo-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    icon: "text-emerald-600 dark:text-emerald-400",
    accent: "border-emerald-500 dark:border-emerald-400",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/30",
    icon: "text-red-600 dark:text-red-400",
    accent: "border-red-500 dark:border-red-400",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-900/30",
    icon: "text-violet-600 dark:text-violet-400",
    accent: "border-violet-500 dark:border-violet-400",
  },
};
