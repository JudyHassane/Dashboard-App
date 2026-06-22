import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/features/store.ts";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import App from "./App.tsx";

import { ThemeModeProvider, useThemeMode } from "./hooks/useThemeMode";
import { getTheme } from "./styles/theme";

export function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </Provider>,
);
