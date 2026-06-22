export interface DashboardState {
  categoriesChart: CategoryStat[];
  topChoices: TopChoices[];
  recentBooks: RecentBook[];
  topAuthors: TopAuthor[];
  recentActivities: RecentActivityItem[];
  kpis: DashboardKpis;
}

export interface CategoryStat {
  id: string;
  label: string;
  value: number;
}

export interface TopChoices {
  id: number;
  coverImage: string;
  title: string;
  author: {
    id: number;
    name: string;
  };
}

export interface RecentBook {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  dateAdded: string;
}

export interface TopAuthor {
  id: number;
  name: string;
  booksCount: number;
}

export type ActivityAction = "book_created" | "book_updated" | "book_deleted";

export interface RecentActivityItem {
  id: number;
  action: ActivityAction;
  message: string;
  createdAt: string;
}

export interface DashboardData {
  categoriesChart: CategoryStat[];
  topChoices: TopChoices[];
  recentBooks: RecentBook[];
  topAuthors: TopAuthor[];
  recentActivities: RecentActivityItem[];
}

export interface DashboardKpis {
  totalBooks: number;
  booksThisWeek: number;
}
