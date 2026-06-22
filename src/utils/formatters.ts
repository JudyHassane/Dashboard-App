export const formatRelativeTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;

  const diffInDays = Math.floor(diffInSeconds / 86400);
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 5) return `${diffInWeeks}w ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;

  return `${Math.floor(diffInDays / 365)}y ago`;
};

export const formatDate = (dateAdded?: string) => {
  if (!dateAdded) return "—";

  const date = new Date(dateAdded);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatDashboardDate = (date = new Date()) => {
  return new Intl.DateTimeFormat("en-LB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatDashboardDayTime = (date = new Date()) => {
  return new Intl.DateTimeFormat("en-LB", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};
