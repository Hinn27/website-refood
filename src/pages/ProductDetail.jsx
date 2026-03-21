import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    Chip,
    Grid,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";
import CardMediaSkeleton from "../components/common/CardMediaSkeleton";
import { useCart } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();
    const { meals: allMeals, loading } = useMeals();

    if (loading) return null;

    const meal = allMeals.find((m) => String(m._id) === String(id));

    if (!meal) {
        return (
            <SectionLayout
                variant="narrow"
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    py: 8,
                }}
            >
                <AnimatedSection variant="fade" delay={0.1}>
                    <Stack alignItems="center" spacing={3}>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/menu"
                            startIcon={<ArrowBackIcon />}
                        >
                            Quay lại thực đơn
                        </Button>
                    </Stack>
                </AnimatedSection>
            </SectionLayout>
        );
    }

    const handleAddToCart = () => {
        addItem({
            _id: meal._id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
        });
    };

    return (
        <SectionLayout
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            {/* Breadcrumbs */}
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <HomeIcon fontSize="small" />
                    Trang chủ
                </Link>
                <Link
                    component={RouterLink}
                    to="/menu"
                    underline="hover"
                    color="text.secondary"
                >
                    Thực đơn
                </Link>
                <Typography color="text.primary" fontWeight={600}>
                    {meal.name}
                </Typography>
            </Breadcrumbs>

            <Grid container spacing={4}>
                {/* Image */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedSection variant="fadeRight" delay={0.1}>
                        <Box
                            sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <CardMediaSkeleton
                                component="img"
                                image={meal.image}
                                alt={meal.name}
                                sx={{
                                    width: "100%",
                                    height: { xs: 300, md: 450 },
                                    objectFit: "cover",
                                }}
                            />
                            <Chip
                                label={meal.tag}
                                icon={<LocalFireDepartmentIcon />}
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    left: 16,
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    fontWeight: 700,
                                    "& .MuiChip-icon": { color: "#fff" },
                                }}
                            />
                        </Box>
                    </AnimatedSection>
                </Grid>

                {/* Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedSection variant="fadeLeft" delay={0.2}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="h3" fontWeight={800}>
                                    {meal.name}
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    sx={{ mt: 1 }}
                                >
                                    <Chip
                                        label={meal.category}
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={meal.origin}
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                    />
                                </Stack>
                            </Box>

                            {/* Rating */}
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <StarIcon sx={{ color: "#FFB400" }} />
                                <Typography fontWeight={700}>
                                    {meal.rating}
                                </Typography>
                                <Typography color="text.secondary">
                                    ({meal.reviews} đánh giá)
                                </Typography>
                            </Stack>

                            {/* Price */}
                            <Typography
                                variant="h3"
                                color="primary"
                                fontWeight={800}
                            >
                                {meal.price.toLocaleString("vi-VN")}đ
                            </Typography>

                            {/* Description */}
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ lineHeight: 1.8 }}
                            >
                                {meal.fullDesc}
                            </Typography>

                            {/* Info chips */}
                            <Stack
                                direction="row"
                                spacing={2}
                                flexWrap="wrap"
                                useFlexGap
                            >
                                <Card
                                    variant="outlined"
                                    sx={{ px: 2, py: 1, borderRadius: 2 }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {meal.time}
                                        </Typography>
                                    </Stack>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{ px: 2, py: 1, borderRadius: 2 }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <DeliveryDiningIcon
                                            fontSize="small"
                                            color="secondary"
                                        />
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            Giao miễn phí
                                        </Typography>
                                    </Stack>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{ px: 2, py: 1, borderRadius: 2 }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
                                        🔥 {meal.calories}
                                    </Typography>
                                </Card>
                            </Stack>

                            {/* Add to cart */}
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<AddShoppingCartIcon />}
                                onClick={handleAddToCart}
                                sx={{
                                    py: 2,
                                    mt: 2,
                                    fontSize: "1.1rem",
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                    },
                                }}
                            >
                                Thêm Vào Giỏ Hàng
                            </Button>
                        </Stack>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

export default ProductDetail;
