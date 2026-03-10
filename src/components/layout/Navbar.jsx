import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
    AppBar,
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useThemeMode } from "../../context/ThemeContext";
import { LAYOUT_MAX_WIDTH, RESPONSIVE_PX } from "./SectionLayout";

const navLinks = [
    {
        label: "Thực Đơn",
        href: "/menu",
        icon: <RestaurantMenuIcon />,
        isRoute: true,
    },
    { label: "Quán Ăn 0đ", href: "/#quan-an-0d", icon: <StorefrontIcon /> },
    {
        label: "Thiện Nguyện",
        href: "/#volunteer",
        icon: <VolunteerActivismIcon />,
    },
];

function Navbar() {
    const { mode, toggleTheme } = useThemeMode();
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);

    const handleLogout = () => {
        logout();
        setLogoutDialog(false);
    };

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
                <Box
                    sx={{
                        maxWidth: LAYOUT_MAX_WIDTH.default,
                        mx: "auto",
                        px: RESPONSIVE_PX,
                        width: "100%",
                    }}
                >
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
                                ReFood
                            </Typography>
                        </Stack>

                        {/* Desktop nav links */}
                        {!isMobile && (
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    flexGrow: 1,
                                    justifyContent: "center",
                                }}
                            >
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.label}
                                        {...(link.isRoute
                                            ? {
                                                  component: RouterLink,
                                                  to: link.href,
                                              }
                                            : { href: link.href })}
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
                            <Tooltip
                                title={
                                    mode === "dark"
                                        ? "Chế độ sáng"
                                        : "Chế độ tối (Ban đêm)"
                                }
                            >
                                <IconButton
                                    onClick={toggleTheme}
                                    sx={{
                                        color:
                                            mode === "dark"
                                                ? "#FFD54F"
                                                : "#5C6BC0",
                                    }}
                                >
                                    {mode === "dark" ? (
                                        <LightModeIcon />
                                    ) : (
                                        <DarkModeIcon />
                                    )}
                                </IconButton>
                            </Tooltip>

                            {/* Cart icon */}
                            <Tooltip title="Giỏ hàng">
                                <IconButton
                                    component={RouterLink}
                                    to="/cart"
                                    sx={{ color: "text.primary" }}
                                >
                                    <Badge
                                        badgeContent={totalItems}
                                        color="primary"
                                        max={99}
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            {!isMobile && (
                                <>
                                    {isAuthenticated ? (
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                color="text.secondary"
                                            >
                                                Xin chào,{" "}
                                                {user?.name?.split(" ").pop()}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                startIcon={<LogoutIcon />}
                                                onClick={() =>
                                                    setLogoutDialog(true)
                                                }
                                                size="small"
                                            >
                                                Đăng Xuất
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            startIcon={<LoginIcon />}
                                            component={RouterLink}
                                            to="/login"
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
                                </>
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
                </Box>
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
                            ReFood
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
                    {isAuthenticated ? (
                        <Stack spacing={1}>
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                textAlign="center"
                            >
                                Xin chào, {user?.name}
                            </Typography>
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<LogoutIcon />}
                                onClick={() => {
                                    setLogoutDialog(true);
                                    setDrawerOpen(false);
                                }}
                            >
                                Đăng Xuất
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={1}>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<LoginIcon />}
                                component={RouterLink}
                                to="/login"
                                onClick={() => setDrawerOpen(false)}
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
                            <Button
                                variant="outlined"
                                fullWidth
                                component={RouterLink}
                                to="/register"
                                onClick={() => setDrawerOpen(false)}
                                color="secondary"
                            >
                                Đăng Ký
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Drawer>

            {/* Dialog xác nhận đăng xuất */}
            <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
                <DialogTitle fontWeight={700}>Đăng xuất?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc muốn đăng xuất khỏi tài khoản ReFood?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleLogout}
                        color="primary"
                        variant="contained"
                    >
                        Đăng Xuất
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Navbar;
