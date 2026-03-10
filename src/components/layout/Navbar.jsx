import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useThemeMode } from "../../context/ThemeContext";

const navLinks = [
    { label: "Suất Ăn Đêm", href: "#night-meal", icon: <NightsStayIcon /> },
    { label: "Quán Ăn 0 Đồng", href: "#zero-dong", icon: <StorefrontIcon /> },
    {
        label: "Thiện Nguyện",
        href: "#volunteer",
        icon: <VolunteerActivismIcon />,
    },
];

function Navbar() {
    const { mode, toggleTheme } = useThemeMode();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    backdropFilter: "blur(10px)",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(30,30,30,0.9)",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ py: 0.5 }}>
                        {/* Logo */}
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ flexGrow: { xs: 1, md: 0 }, mr: { md: 4 } }}
                        >
                            <RestaurantIcon
                                sx={{
                                    fontSize: 32,
                                    color: "primary.main",
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontWeight={800}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                ReFoodVN
                            </Typography>
                        </Stack>

                        {/* Desktop nav links */}
                        {!isMobile && (
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ flexGrow: 1 }}
                            >
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.label}
                                        href={link.href}
                                        startIcon={link.icon}
                                        sx={{
                                            color: "text.primary",
                                            fontWeight: 500,
                                            "&:hover": {
                                                bgcolor: "action.hover",
                                                color: "primary.main",
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </Stack>
                        )}

                        {/* Right side */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton
                                onClick={toggleTheme}
                                sx={{
                                    color:
                                        mode === "dark" ? "#FFD54F" : "#5C6BC0",
                                }}
                                title={
                                    mode === "dark"
                                        ? "Chuyển sang chế độ sáng"
                                        : "Chuyển sang chế độ tối (Ban đêm)"
                                }
                            >
                                {mode === "dark" ? (
                                    <LightModeIcon />
                                ) : (
                                    <DarkModeIcon />
                                )}
                            </IconButton>

                            {!isMobile && (
                                <Button
                                    variant="contained"
                                    startIcon={<LoginIcon />}
                                    href="/login"
                                    sx={{
                                        background:
                                            "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                        },
                                    }}
                                >
                                    Đăng Nhập
                                </Button>
                            )}

                            {isMobile && (
                                <IconButton
                                    onClick={() => setDrawerOpen(true)}
                                    sx={{ color: "text.primary" }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: 280, bgcolor: "background.paper" },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            color="primary"
                        >
                            ReFoodVN
                        </Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>
                <Divider />
                <List>
                    {navLinks.map((link) => (
                        <ListItem key={link.label} disablePadding>
                            <ListItemButton
                                href={link.href}
                                onClick={() => setDrawerOpen(false)}
                            >
                                <ListItemIcon sx={{ color: "primary.main" }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<LoginIcon />}
                        href="/login"
                        sx={{
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                            },
                        }}
                    >
                        Đăng Nhập
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;
