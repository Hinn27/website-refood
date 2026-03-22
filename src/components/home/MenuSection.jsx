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

// Style constants để tránh tạo object mới mỗi lần render
const TOGGLE_GROUP_SX = {
    flexWrap: "wrap",
    gap: 1,
    justifyContent: "center",
    "& .MuiToggleButton-root": {
        borderRadius: "24px !important",
        border: "1px solid",
        borderColor: "divider",
        px: 2.5,
        py: 0.8,
        textTransform: "none",
        fontWeight: 600,
        "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "#fff",
            borderColor: "primary.main",
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
};
const CHIP_TAG_SX = {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 2,
    bgcolor: "primary.main",
    color: "#fff",
    fontWeight: 600,
    "& .MuiChip-icon": { color: "#fff" },
};
const CHIP_RATING_SX = {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    bgcolor: "rgba(0,0,0,0.7)",
    color: "#FFD54F",
    fontWeight: 700,
    "& .MuiChip-icon": { color: "#FFD54F" },
};
const ICON_BUTTON_SX = {
    bgcolor: "primary.main",
    color: "#fff",
    width: 44,
    height: 44,
    "&:hover": {
        bgcolor: "primary.dark",
        transform: "scale(1.1)",
    },
    transition: "transform 0.2s ease",
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

    // Memo hóa callback để tránh tạo lại mỗi lần render (đặt trước mọi return)
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
                    <Grid container spacing={4}>
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

    // Hiển thị tất cả món, grid sẽ tự động chia 4 món 1 hàng nhờ lg=3
    const filteredMeals =
        activeCategory === "all"
            ? allMeals
            : allMeals.filter((m) => m.category === activeCategory);
    const displayedMeals = filteredMeals;

    return (
        <SectionLayout
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <RestaurantMenuIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box>
                        <Typography variant="h3" fontWeight={700}>
                            Thực Đơn
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Khám phá các món ăn Việt Nam truyền thống — Phục vụ
                            24/7, giao tận nơi cho cô chú lao động
                        </Typography>
                    </Box>
                </Stack>
            </AnimatedSection>

            {/* Category Filter */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
                <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
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
            <AnimatedSection variant="fadeUp" delay={0.25}>
                <Grid container spacing={3} justifyContent="center">
                    {displayedMeals.map((meal) => (
                        <Grid item key={meal._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={CARD_SX}>
                                <Chip
                                    label={meal.tag}
                                    size="small"
                                    icon={<LocalFireDepartmentIcon />}
                                    sx={CHIP_TAG_SX}
                                />
                                <CardActionArea
                                    component={RouterLink}
                                    to={`/product/${meal._id}`}
                                >
                                    <CardMediaSkeleton
                                        component="img"
                                        image={meal.image}
                                        alt={meal.name}
                                        sx={{
                                            aspectRatio: "16/10",
                                            objectFit: "cover",
                                            width: "100%",
                                            maxHeight: 180,
                                        }}
                                    />
                                </CardActionArea>
                                <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        gutterBottom
                                        component={RouterLink}
                                        to={`/product/${meal._id}`}
                                        sx={{
                                            textDecoration: "none",
                                            color: "text.primary",
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
                                            mb: 1.5,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {meal.desc}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{ mb: 1 }}
                                    >
                                        <StarIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "#FFB400",
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            fontWeight={600}
                                        >
                                            {meal.rating}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            • {meal.origin}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={0.3}
                                            alignItems="center"
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    fontSize: 13,
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
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            fontWeight={800}
                                        >
                                            {meal.price.toLocaleString("vi-VN")}
                                            đ
                                        </Typography>
                                        <Tooltip title="Thêm vào giỏ hàng">
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleAddToCart(meal)
                                                }
                                                sx={ICON_BUTTON_SX}
                                            >
                                                <AddShoppingCartIcon fontSize="small" />
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
