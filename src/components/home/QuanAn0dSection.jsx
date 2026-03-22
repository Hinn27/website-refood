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
        originalPrice: meal.price,
        price: 0,
    }));

    return (
        <SectionLayout
            id="quan-an-0d"
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
                    <StorefrontIcon sx={{ fontSize: 40, color: "#E91E63" }} />
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h3" fontWeight={700}>
                                Quán Ăn 0đ
                            </Typography>
                            <FavoriteIcon
                                sx={{ fontSize: 24, color: "#E91E63" }}
                            />
                        </Stack>
                        <Typography variant="body1" color="text.secondary">
                            Bữa ăn miễn phí cho người lao động khó khăn
                        </Typography>
                    </Box>
                </Stack>
            </AnimatedSection>

            {/* Meals grid */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {quanAn0dMeals.map((meal) => (
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
                                    label="MIỄN PHÍ"
                                    size="small"
                                    icon={<VolunteerActivismIcon />}
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        zIndex: 2,
                                        bgcolor: "#E91E63",
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
                                        <Box>
                                            <Typography
                                                variant="h6"
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
                                                {meal.originalPrice
                                                    ? `${meal.originalPrice.toLocaleString("vi-VN")}đ`
                                                    : "35.000đ"}
                                            </Typography>
                                        </Box>
                                        <Tooltip title="Thêm vào giỏ hàng">
                                            <IconButton
                                                onClick={() =>
                                                    handleAddToCart(meal)
                                                }
                                                sx={{
                                                    bgcolor: "#E91E63",
                                                    color: "#fff",
                                                    width: 40,
                                                    height: 40,
                                                    "&:hover": {
                                                        bgcolor: "#C2185B",
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

export default QuanAn0dSection;
