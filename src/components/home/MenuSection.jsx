import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useMeals } from "../../context/useMeals";
import AnimatedSection from "../common/AnimatedSection";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import SectionLayout from "../layout/SectionLayout";

// Style constants
const TOGGLE_GROUP_SX = {
    flexWrap: "wrap",
    gap: 1,
    justifyContent: "center",
    "& .MuiToggleButton-root": {
        borderRadius: "20px !important",
        border: "1.5px solid",
        borderColor: "divider",
        px: 2.5,
        py: 0.75,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.875rem",
        transition: "all 0.2s ease",
        "&:hover": {
            bgcolor: "action.hover",
            borderColor: "primary.light",
        },
        "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "#fff",
            borderColor: "primary.main",
            boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
            "&:hover": {
                bgcolor: "primary.dark",
            },
        },
    },
};

const CARD_SX = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    borderRadius: 3,
    bgcolor: "background.paper",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
    },
};

const CHIP_TAG_SX = {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 2,
    bgcolor: "primary.main",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.75rem",
    height: 26,
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.4)",
    "& .MuiChip-icon": { color: "#fff", fontSize: 16 },
};

const ICON_BUTTON_SX = {
    bgcolor: "primary.main",
    color: "#fff",
    width: 42,
    height: 42,
    borderRadius: 2,
    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.35)",
    "&:hover": {
        bgcolor: "primary.dark",
        transform: "scale(1.08)",
        boxShadow: "0 6px 16px rgba(76, 175, 80, 0.45)",
    },
    transition: "all 0.2s ease",
};

const categories = [
    { label: "Tất cả", value: "all" },
    { label: "Bún / Phở", value: "Bún/Phở" },
    { label: "Cơm", value: "Cơm" },
    { label: "Bánh mì", value: "Bánh mì" },
    { label: "Đồ ăn khác", value: "Đồ ăn khác" },
];

function MenuSection() {
    const { addItem } = useCart();
    const { meals: allMeals, loading, error } = useMeals();
    const [activeCategory, setActiveCategory] = useState("all");

    const handleAddToCart = useCallback(
        (meal) => {
            addItem({
                _id: meal._id,
                name: meal.name,
                price: meal.price,
                image: meal.image,
            });
        },
        [addItem]
    );

    if (loading) {
        return (
            <SectionLayout id="menu">
                <Box sx={{ py: 8 }}>
                    <Grid container spacing={3}>
                        {[...Array(8)].map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <CardMediaSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </SectionLayout>
        );
    }

    if (error) {
        return (
            <SectionLayout id="menu">
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Không thể tải danh sách món ăn
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Lỗi: {error}. Vui lòng kiểm tra kết nối với Backend API.
                    </Typography>
                </Box>
            </SectionLayout>
        );
    }

    const filteredMeals =
        activeCategory === "all"
            ? allMeals
            : allMeals.filter((m) => m.category === activeCategory);

    return (
        <SectionLayout
            id="menu"
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 6, md: 10 } }}
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mb: 1.5 }}
                    >
                        <RestaurantMenuIcon
                            color="primary"
                            sx={{ fontSize: 42 }}
                        />
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                background:
                                    "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Thực Đơn
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.7 }}
                    >
                        Khám phá các món ăn Việt Nam truyền thống — Phục vụ
                        24/7, giao tận nơi cho cô chú lao động
                    </Typography>
                </Box>
            </AnimatedSection>

            {/* Category Filter */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
                <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
                    <ToggleButtonGroup
                        value={activeCategory}
                        exclusive
                        onChange={(e, val) => val && setActiveCategory(val)}
                        size="small"
                        sx={TOGGLE_GROUP_SX}
                    >
                        {categories.map((cat) => (
                            <ToggleButton key={cat.value} value={cat.value}>
                                {cat.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            </AnimatedSection>

            {/* Meals grid */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
                <Grid container spacing={3} justifyContent="center">
                    {filteredMeals.map((meal) => (
                        <Grid item key={meal._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={CARD_SX}>
                                {meal.tag && (
                                    <Chip
                                        label={meal.tag}
                                        size="small"
                                        icon={<LocalFireDepartmentIcon />}
                                        sx={CHIP_TAG_SX}
                                    />
                                )}
                                <CardActionArea
                                    component={RouterLink}
                                    to={`/product/${meal._id}`}
                                >
                                    <Box sx={{ position: "relative" }}>
                                        <CardMediaSkeleton
                                            component="img"
                                            image={meal.image}
                                            alt={meal.name}
                                            sx={{
                                                aspectRatio: "4/3",
                                                objectFit: "cover",
                                                width: "100%",
                                            }}
                                        />
                                        {/* Rating badge */}
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            alignItems="center"
                                            sx={{
                                                position: "absolute",
                                                bottom: 10,
                                                right: 10,
                                                bgcolor: "rgba(0,0,0,0.75)",
                                                color: "#fff",
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1.5,
                                            }}
                                        >
                                            <StarIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFD700",
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                fontWeight={700}
                                            >
                                                {meal.rating}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </CardActionArea>

                                <CardContent
                                    sx={{ flexGrow: 1, p: 2, pt: 2.5 }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        component={RouterLink}
                                        to={`/product/${meal._id}`}
                                        sx={{
                                            textDecoration: "none",
                                            color: "text.primary",
                                            display: "block",
                                            mb: 0.75,
                                            transition: "color 0.2s",
                                            "&:hover": {
                                                color: "primary.main",
                                            },
                                        }}
                                    >
                                        {meal.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 2,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            lineHeight: 1.5,
                                            minHeight: 42,
                                        }}
                                    >
                                        {meal.desc}
                                    </Typography>

                                    {/* Info row */}
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                bgcolor: "action.hover",
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 1,
                                            }}
                                        >
                                            {meal.origin}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            alignItems="center"
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: "text.secondary",
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {meal.time}
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    {/* Price & Cart */}
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="primary.main"
                                            fontWeight={800}
                                        >
                                            {meal.price.toLocaleString("vi-VN")}
                                            đ
                                        </Typography>
                                        <Tooltip title="Thêm vào giỏ hàng">
                                            <IconButton
                                                onClick={() =>
                                                    handleAddToCart(meal)
                                                }
                                                sx={ICON_BUTTON_SX}
                                            >
                                                <AddShoppingCartIcon
                                                    sx={{ fontSize: 20 }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default MenuSection;
