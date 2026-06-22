export const colors = {
  primary: {
    main: "#4F46E5", // indigo-600
    light: "#818CF8", // indigo-400
    dark: "#3730A3", // indigo-800
  },

  secondary: {
    main: "#7C3AED", // violet-600
    light: "#A78BFA", // violet-400
    dark: "#5B21B6", // violet-800
  },

  chart: ["#4F46E5", "#7C3AED", "#9333EA", "#C084FC", "#818CF8", "#A78BFA"],

  auth: {
    gradient: {
      start: "#4F46E5",
      middle: "#7C3AED",
      end: "#9333EA",
    },
    title: "#FFFFFF",
    subtitle: "#C7D2FE",
    decorationBlur1: "rgba(255, 255, 255, 0.1)",
    decorationBlur2: "rgba(99, 102, 241, 0.2)",
  },

  background: {
    default: {
      light: "#F9FAFB",
      dark: "#0F172A",
    },
    paper: {
      light: "#FFFFFF",
      dark: "#1E293B",
    },
  },

  text: {
    primary: {
      light: "#111827",
      dark: "#F1F5F9",
    },
    secondary: {
      light: "#7e6b80ff",
      dark: "#94A3B8",
    },
  },

  error: {
    main: "#EF4444",
    light: "#ffe8e8ff",
  },

  success: {
    main: "#10B981",
    light: "#e7fcf6ff",
  },

  info: {
    main: "info.main",
    light: "#eff6ff",
  },

  border: {
    light: "#F3F4F6",
    dark: "#334155",
  },

  statusChip: {
    available: {
      light: {
        border: "rgba(34, 197, 94, 0.25)",
        background: "rgba(34, 197, 94, 0.08)",
        text: "rgb(22, 101, 52)",
      },
      dark: {
        border: "rgba(74, 222, 128, 0.25)",
        background: "rgba(34, 197, 94, 0.12)",
        text: "rgb(134, 239, 172)",
      },
    },
    unavailable: {
      light: {
        border: "rgba(239, 68, 68, 0.25)",
        background: "rgba(239, 68, 68, 0.08)",
        text: "rgb(153, 27, 27)",
      },
      dark: {
        border: "rgba(248, 113, 113, 0.25)",
        background: "rgba(239, 68, 68, 0.12)",
        text: "rgb(252, 165, 165)",
      },
    },
  },

  dialog: {
    backdrop: "rgba(15, 23, 42, 0.5)",
    headerGradientStart: "#4F46E5",
    headerGradientEnd: "#7C3AED",
    headerIconBg: "rgba(255, 255, 255, 0.15)",
    headerSubtitle: "rgba(255, 255, 255, 0.75)",
    closeButtonHover: "rgba(255, 255, 255, 0.15)",
    scrollbar: {
      track: { light: "transparent", dark: "transparent" },
      thumb: {
        light: "rgba(0, 0, 0, 0.15)",
        dark: "rgba(255, 255, 255, 0.15)",
      },
      thumbHover: {
        light: "rgba(0, 0, 0, 0.25)",
        dark: "rgba(255, 255, 255, 0.25)",
      },
    },
  },
};
