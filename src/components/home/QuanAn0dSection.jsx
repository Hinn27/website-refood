import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useMeals } from "../../context/useMeals";
import AnimatedSection from "../common/AnimatedSection";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import SectionLayout from "../layout/SectionLayout";

// Style constants để tránh tạo object mới mỗi lần render
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
const ICON_BUTTON_SX = {
    bgcolor: "primary.main",
    color: "#fff",
    width: 48,
    height: 48,
    "&:hover": { bgcolor: "primary.dark" },
};

function QuanAn0dSection() {
    const { addItem } = useCart();
    const { meals, loading, error } = useMeals();
    // const gridRef = useRef(null);
    // const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

    // Memo hóa callback để tránh tạo lại mỗi lần render (đặt trước mọi return)
    const handleAddToCart = useCallback(
        (meal) => {
            addItem({
                _id: meal._id,
                name: meal.name,
                price: 0, // Giá 0đ khi thêm vào giỏ hàng
                image: meal.image,
            });
        },
        [addItem]
    );

    if (loading) return null;
    if (error) return null;

    // Dùng toàn bộ meals, giá 0đ
    const quanAn0dMeals = meals.map((meal) => ({
        ...meal,
        price: 0,
    }));
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
                    <StorefrontIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box>
                        <Typography variant="h3" fontWeight={700}>
                            Quán Ăn 0đ
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Bữa ăn miễn phí cho người lao động khó khăn — Đặt
                            nhanh, giao tận nơi, hoàn toàn miễn phí
                        </Typography>
                    </Box>
                </Stack>
            </AnimatedSection>

            {/* Meals grid */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
                <Grid container spacing={3}>
                    {quanAn0dMeals.map((meal) => (
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
                                            0đ
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

export default QuanAn0dSection;
