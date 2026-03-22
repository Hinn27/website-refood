import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
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

// Style constants
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
    border: "1px solid",
    borderColor: "transparent",
    "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 12px 28px rgba(233, 30, 99, 0.12)",
        borderColor: "rgba(233, 30, 99, 0.2)",
    },
};

const CHIP_FREE_SX = {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 2,
    bgcolor: "#E91E63",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.75rem",
    height: 28,
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(233, 30, 99, 0.4)",
    "& .MuiChip-icon": { color: "#fff", fontSize: 16 },
};

const ICON_BUTTON_SX = {
    bgcolor: "#E91E63",
    color: "#fff",
    width: 42,
    height: 42,
    borderRadius: 2,
    boxShadow: "0 4px 12px rgba(233, 30, 99, 0.35)",
    "&:hover": {
        bgcolor: "#C2185B",
        transform: "scale(1.08)",
        boxShadow: "0 6px 16px rgba(233, 30, 99, 0.45)",
    },
    transition: "all 0.2s ease",
};

function QuanAn0dSection() {
    const { addItem } = useCart();
    const { meals, loading, error } = useMeals();

    const handleAddToCart = useCallback(
        (meal) => {
            addItem({
                _id: meal._id,
                name: meal.name,
                price: 0,
                image: meal.image,
            });
        },
        [addItem]
    );

    if (loading) return null;
    if (error) return null;

    const quanAn0dMeals = meals.map((meal) => ({
        ...meal,
        price: 0,
    }));

    return (
        <SectionLayout
            id="quan-an-0d"
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
                        <StorefrontIcon
                            sx={{ fontSize: 42, color: "#E91E63" }}
                        />
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                background:
                                    "linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Quán Ăn 0đ
                        </Typography>
                        <FavoriteIcon sx={{ fontSize: 28, color: "#E91E63" }} />
                    </Stack>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.7 }}
                    >
                        Bữa ăn miễn phí cho người lao động khó khăn — Đặt nhanh,
                        giao tận nơi, hoàn toàn miễn phí
                    </Typography>
                </Box>
            </AnimatedSection>

            {/* Meals grid */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
                <Grid container spacing={3}>
                    {quanAn0dMeals.map((meal) => (
                        <Grid item key={meal._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={CARD_SX}>
                                <Chip
                                    label="MIỄN PHÍ"
                                    size="small"
                                    icon={<VolunteerActivismIcon />}
                                    sx={CHIP_FREE_SX}
                                />
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
                                                color: "#E91E63",
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
                                        <Box>
                                            <Typography
                                                variant="h5"
                                                fontWeight={800}
                                                sx={{ color: "#E91E63" }}
                                            >
                                                0đ
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                            >
                                                {meal.price
                                                    ? `${(meal.price * 1.5).toLocaleString("vi-VN")}đ`
                                                    : "35.000đ"}
                                            </Typography>
                                        </Box>
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

export default QuanAn0dSection;
