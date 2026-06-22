import { colors } from "./colors";

export const authStyles = {
  // Layout styles
  layout: {
    container:
      "min-h-screen flex flex-col lg:flex-row bg-white overflow-y-auto lg:overflow-hidden",
    leftPanel:
      "w-full flex-1 lg:w-[43%] flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24 relative z-10",
    leftPanelInner: "w-full max-w-md",
    rightPanel:
      "flex w-full min-h-[280px] sm:min-h-[320px] lg:min-h-screen lg:w-[57%] relative overflow-hidden order-first lg:order-none",
    rightPanelInner:
      "relative flex-1 flex items-center justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-24",
    contentWrapper:
      "relative z-20 w-full flex items-center justify-center pb-12 lg:pb-0 lg:pl-[80px] 2xl:pl-[100px]",
    textContainer:
      "text-center max-w-md sm:max-w-lg 2xl:max-w-2xl w-full flex flex-col items-center",
  },

  // Typography styles for auth pages
  typography: {
    title:
      "text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white leading-snug mb-2 sm:mb-3 2xl:mb-5 whitespace-pre-line",
    subtitle:
      "text-indigo-200 text-sm sm:text-base xl:text-lg 2xl:text-xl mb-3 sm:mb-4",
    illustration: "animate-float flex justify-center w-full",
    illustrationImg:
      "w-full max-w-[190px] sm:max-w-[240px] md:max-w-[280px] xl:max-w-[380px] 2xl:max-w-[460px] object-contain rounded-2xl mx-auto",
  },

  // Decorative elements
  decoration: {
    waveSvg:
      "hidden lg:block absolute left-0 top-0 h-full w-[150px] 2xl:w-[180px] z-10",
    waveSvgMobile:
      "block lg:hidden absolute bottom-0 left-0 w-full h-[60px] sm:h-[80px] z-10",
    blurCircle1:
      "absolute top-10 right-10 sm:top-16 sm:right-16 w-40 h-40 sm:w-56 sm:h-56 2xl:w-80 2xl:h-80 rounded-full bg-white/10 blur-3xl",
    blurCircle2:
      "absolute bottom-8 left-10 sm:bottom-16 sm:left-20 w-36 h-36 sm:w-48 sm:h-48 2xl:w-64 2xl:h-64 rounded-full bg-indigo-400/20 blur-2xl",
  },

  form: {
    inputWrapper: `
    relative
  `,

    input: `
    peer appearance-none rounded-xl relative block w-full
    px-11 py-3
    border border-gray-300 text-gray-900
    bg-gray-50 focus:bg-white
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
    sm:text-sm transition-colors duration-200
  `,

    floatingLabel: `
    absolute left-10 top-1/2 -translate-y-1/2
    text-gray-400 text-sm pointer-events-none
    transition-all duration-200 bg-gray-50 px-1

    peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white

    peer-[:not(:placeholder-shown)]:top-0
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:text-indigo-600
    peer-[:not(:placeholder-shown)]:bg-white
  `,

    startIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10",

    error: "mt-1 text-sm text-red-500",

    link: "font-medium text-indigo-600 hover:text-indigo-500 transition-colors",

    infoBox: "text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mt-4",

    passwordToggle:
      "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer z-10",

    header: "mb-8",

    title: "text-3xl font-extrabold text-gray-900 tracking-tight",

    subtitle: "mt-2 text-sm text-gray-500",

    form: "space-y-6",

    fieldsWrapper: "flex flex-col gap-5",

    footer: "text-center pt-2",

    footerText: "text-sm text-gray-600",

    termsText: "font-semibold",
  },

  // Helper to generate the gradient string
  getGradient: () => {
    const { start, middle, end } = colors.auth.gradient;
    return `linear-gradient(135deg, ${start} 0%, ${middle} 50%, ${end} 100%)`;
  },
};
