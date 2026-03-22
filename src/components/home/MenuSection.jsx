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

const TOGGLE_GROUP_SX = {
    flexWrap: "wrap",
    "& .MuiToggleButton-root": {
        borderRadius: "20px !important",
        border: "1px solid",
        borderColor: "divider",
        mx: 0.5,
        my: 0.5,
        px: 2,
        textTransform: "none",
        fontWeight: 500,
        "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": {
                bgcolor: "primary.dark",
            },
        },
    },
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
                            Các món ăn phục vụ 24/7 — Đặc biệt hỗ trợ ca đêm
                        </Typography>
                    </Box>
                </Stack>
            </AnimatedSection>

            {/* Category Filter */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
                <Box sx={{ mb: 4, mt: 3 }}>
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
                <Grid container spacing={3}>
                    {filteredMeals.map((meal) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            key={meal._id}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <Chip
                                    label={meal.tag}
                                    size="small"
                                    icon={<LocalFireDepartmentIcon />}
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        zIndex: 2,
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        fontWeight: 600,
                                        "& .MuiChip-icon": {
                                            color: "#fff",
                                        },
                                    }}
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
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "#fff",
                                                    width: 40,
                                                    height: 40,
                                                    "&:hover": {
                                                        bgcolor: "primary.dark",
                                                    },
                                                }}
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
