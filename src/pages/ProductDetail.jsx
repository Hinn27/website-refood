import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import CardMediaSkeleton from "../components/common/CardMediaSkeleton";
import SectionLayout from "../components/layout/SectionLayout";
import { useCart } from "../context/CartContext";
import { useMeals } from "../context/useMeals";

function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();
    const { meals: allMeals, loading, error } = useMeals();

    if (loading) {
        return (
            <SectionLayout>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <CardMediaSkeleton
                                sx={{
                                    aspectRatio: "16/10",
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <CardMediaSkeleton
                                sx={{ height: 40, width: "60%" }}
                            />
                            <CardMediaSkeleton
                                sx={{ height: 30, width: "30%" }}
                            />
                            <CardMediaSkeleton
                                sx={{ height: 100, width: "100%" }}
                            />
                            <CardMediaSkeleton
                                sx={{ height: 50, width: "40%" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </SectionLayout>
        );
    }

    if (error) {
        return (
            <SectionLayout>
                <Typography variant="h6" color="error">
                    Lỗi tải thông tin sản phẩm: {error}
                </Typography>
            </SectionLayout>
        );
    }

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
                        <Typography variant="h5" color="text.secondary">
                            Không tìm thấy món ăn này.
                        </Typography>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/menu"
                        >
                            Quay lại Thực đơn
                        </Button>
                    </Stack>
                </AnimatedSection>
            </SectionLayout>
        );
    }
}

export default ProductDetail;
