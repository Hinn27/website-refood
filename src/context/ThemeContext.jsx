import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "../theme";

const ThemeContext = createContext({
    mode: "light",
    toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        // Kiểm tra giờ hiện tại: 18h-6h → tự động bật Dark Mode cho lao động ca đêm
        const savedMode = localStorage.getItem("refood-theme-mode");
        if (savedMode) return savedMode;
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6 ? "dark" : "light";
    });

    const toggleTheme = () => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("refood-theme-mode", next);
            return next;
        });
    };

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
