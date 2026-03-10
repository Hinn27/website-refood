import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
    Box,
    Button,
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
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AnimatedSection, {
    MotionBox,
    staggerContainer,
    staggerItem,
} from "../common/AnimatedSection";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import SectionLayout from "../layout/SectionLayout";

const quanAn0dMeals = [
    {
        _id: "1",
        name: "Phở Bò Gia Truyền",
        price: 50000,
        image: "/assets/images/food/pho-bo.jpg",
        desc: "Nước dùng ninh xương 12 tiếng, thịt bò tái chín mềm",
        time: "15 phút",
        tag: "Bán chạy",
    },
    {
        _id: "2",
        name: "Bánh Mì Thịt Nướng",
        price: 25000,
        image: "/assets/images/food/banh-mi-thit.jpg",
        desc: "Bánh mì giòn rụm, thịt nướng than hoa thơm lừng",
        time: "10 phút",
        tag: "Nhanh",
    },
    {
        _id: "3",
        name: "Cơm Tấm Sườn Nướng",
        price: 45000,
        image: "/assets/images/food/com-tam-suon-nuong.jpg",
        desc: "Sườn nướng mắm, bì trộn, chả trứng, nước mắm pha",
        time: "20 phút",
        tag: "Đầy đủ",
    },
    {
        _id: "4",
        name: "Bún Bò Huế",
        price: 55000,
        image: "/assets/images/food/bun-bo-hue.jpg",
        desc: "Bún bò cay nồng đặc trưng xứ Huế, giò heo mềm rục",
        time: "18 phút",
        tag: "Đặc sản",
    },
    {
        _id: "5",
        name: "Hủ Tiếu Nam Vang",
        price: 40000,
        image: "/assets/images/food/hu-tieu.jpg",
        desc: "Hủ tiếu dai mềm, nước lèo trong, tôm thịt hải sản",
        time: "15 phút",
        tag: "Nhẹ bụng",
    },
    {
        _id: "6",
        name: "Bún Chả Hà Nội",
        price: 45000,
        image: "/assets/images/food/bun-cha.jpg",
        desc: "Chả viên nướng than, bún tươi, nước chấm chua ngọt",
        time: "20 phút",
        tag: "Truyền thống",
    },
];

function QuanAn0dSection() {
    const { addItem } = useCart();
    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

    const handleAddToCart = (meal) => {
        addItem({
            _id: meal._id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
        });
    };

    return (
        <SectionLayout id="quan-an-0d" bgcolor="background.default">
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "center", sm: "flex-end" }}
                    sx={{ mb: 5 }}
                    spacing={2}
                >
                    <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{
                                mb: 1,
                                justifyContent: {
                                    xs: "center",
                                    sm: "flex-start",
                                },
                            }}
                        >
                            <StorefrontIcon color="primary" fontSize="large" />
                            <Typography variant="h3" fontWeight={700}>
                                Quán Ăn 0đ
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: 480 }}
                        >
                            Bữa ăn miễn phí cho người lao động khó khăn — Đặt
                            nhanh, giao tận nơi, hoàn toàn miễn phí
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        component={RouterLink}
                        to="/menu"
                    >
                        Xem tất cả →
                    </Button>
                </Stack>
            </AnimatedSection>

            {/* Meal Cards */}
            <MotionBox
                ref={gridRef}
                variants={staggerContainer}
                initial="hidden"
                animate={isGridInView ? "visible" : "hidden"}
            >
                <Grid container spacing={3}>
                    {quanAn0dMeals.map((meal) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={meal._id}>
                            <MotionBox variants={staggerItem}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                        overflow: "visible",
                                    }}
                                >
                                    {/* Tag */}
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
                                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            gutterBottom
                                        >
                                            {meal.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            {meal.desc}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h5"
                                                    color="primary"
                                                    fontWeight={800}
                                                >
                                                    {meal.price.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    đ
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={0.5}
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
                                            </Box>
                                            <Tooltip title="Thêm vào giỏ hàng">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleAddToCart(meal)
                                                    }
                                                    sx={{
                                                        bgcolor: "primary.main",
                                                        color: "#fff",
                                                        width: 48,
                                                        height: 48,
                                                        "&:hover": {
                                                            bgcolor:
                                                                "primary.dark",
                                                        },
                                                    }}
                                                >
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </MotionBox>
                        </Grid>
                    ))}
                </Grid>
            </MotionBox>
        </SectionLayout>
    );
}

export default QuanAn0dSection;
