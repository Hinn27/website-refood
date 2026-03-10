import { createTheme } from "@mui/material/styles";

// Bảng màu ReFood
// Cam ấm: thực phẩm / sự ấm áp
// Xanh lá: hy vọng / thiện nguyện
const palette = {
    warm: {
        main: "#E8651A", // cam chủ đạo
        light: "#FF8A3D",
        dark: "#B84D10",
        contrastText: "#FFFFFF",
    },
    hope: {
        main: "#2E7D32", // xanh lá chủ đạo
        light: "#4CAF50",
        dark: "#1B5E20",
        contrastText: "#FFFFFF",
    },
};

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: palette.warm.main,
            light: palette.warm.light,
            dark: palette.warm.dark,
            contrastText: palette.warm.contrastText,
        },
        secondary: {
            main: palette.hope.main,
            light: palette.hope.light,
            dark: palette.hope.dark,
            contrastText: palette.hope.contrastText,
        },
        ...(mode === "light"
            ? {
                background: {
                    default: "#FFF8F0",
                    paper: "#FFFFFF",
                },
                text: {
                    primary: "#2D2D2D",
                    secondary: "#5A5A5A",
                },
            }
            : {
                background: {
                    default: "#121212",
                    paper: "#1E1E1E",
                },
                text: {
                    primary: "#F5F5F5",
                    secondary: "#B0B0B0",
                },
            }),
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
        h1: {
            fontWeight: 800,
            fontSize: "3rem",
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 700,
            fontSize: "2.25rem",
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 700,
            fontSize: "1.75rem",
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.1rem",
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.7,
        },
        body2: {
            fontSize: "0.9rem",
            lineHeight: 1.6,
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "12px 28px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                },
                sizeLarge: {
                    padding: "16px 36px",
                    fontSize: "1.1rem",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
                },
            },
        },
    },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
