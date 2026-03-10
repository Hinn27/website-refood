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
import { useCart } from "../context/CartContext";

// Reuse the same mock data — sẽ chuyển thành shared data/API sau
const allMeals = [
    {
        _id: "1",
        name: "Phở Bò Gia Truyền",
        price: 50000,
        image: "/assets/images/food/pho-bo.jpg",
        desc: "Nước dùng ninh xương 12 tiếng, thịt bò tái chín mềm",
        fullDesc:
            "Phở bò gia truyền với nước dùng được ninh từ xương bò trong 12 tiếng, tái chín mềm thơm. Ăn kèm giá đỗ, rau thơm, chanh ớt tươi. Món ăn kinh điển để tiếp sức cho đêm làm việc dài.",
        time: "15 phút",
        tag: "Bán chạy",
        rating: 4.8,
        reviews: 256,
        category: "Bún/Phở",
        origin: "Hà Nội",
        calories: "450 kcal",
    },
    {
        _id: "2",
        name: "Bánh Mì Thịt Nướng",
        price: 25000,
        image: "/assets/images/food/banh-mi-thit.jpg",
        desc: "Bánh mì giòn rụm, thịt nướng than hoa thơm lừng",
        fullDesc:
            "Bánh mì vỏ giòn ruột mềm, nhân thịt heo nướng than hoa thơm lừng, đồ chua rau ngò rắc mỡ hành. Món ăn nhanh gọn cho những phút nghỉ ngắn giữa ca đêm.",
        time: "10 phút",
        tag: "Nhanh",
        rating: 4.6,
        reviews: 189,
        category: "Bánh mì",
        origin: "Sài Gòn",
        calories: "380 kcal",
    },
    {
        _id: "3",
        name: "Cơm Tấm Sườn Nướng",
        price: 45000,
        image: "/assets/images/food/com-tam-suon-nuong.jpg",
        desc: "Sườn nướng mắm, bì trộn, chả trứng, nước mắm pha",
        fullDesc:
            "Cơm tấm hạt dẻo thơm, sườn nướng mắm đậm vị, bì trộn giòn sật, chả trứng hấp mềm. Nước mắm pha ngọt thanh, ăn kèm đồ chua dưa leo. Phần ăn đầy đủ dinh dưỡng.",
        time: "20 phút",
        tag: "Đầy đủ",
        rating: 4.9,
        reviews: 312,
        category: "Cơm",
        origin: "Sài Gòn",
        calories: "650 kcal",
    },
    {
        _id: "4",
        name: "Bún Bò Huế",
        price: 55000,
        image: "/assets/images/food/bun-bo-hue.jpg",
        desc: "Bún bò cay nồng đặc trưng xứ Huế, giò heo mềm rục",
        fullDesc:
            "Bún bò Huế đậm đà với nước dùng ninh xương, sả, ruốc Huế cay nồng đặc trưng. Giò heo mềm rục, chả cua thơm ngậy. Tô bún nóng hổi xua tan cái lạnh đêm khuya.",
        time: "18 phút",
        tag: "Đặc sản",
        rating: 4.7,
        reviews: 198,
        category: "Bún/Phở",
        origin: "Huế",
        calories: "520 kcal",
    },
    {
        _id: "5",
        name: "Hủ Tiếu Nam Vang",
        price: 40000,
        image: "/assets/images/food/hu-tieu.jpg",
        desc: "Hủ tiếu dai mềm, nước lèo trong, tôm thịt hải sản",
        fullDesc:
            "Hủ tiếu Nam Vang với sợi dai mềm, nước lèo trong veo ngọt thanh từ xương heo và tôm khô. Tôm tươi, thịt bằm, gan, trứng cút đầy đặn. Món ăn nhẹ bụng cho đêm dài.",
        time: "15 phút",
        tag: "Nhẹ bụng",
        rating: 4.5,
        reviews: 145,
        category: "Bún/Phở",
        origin: "Sài Gòn",
        calories: "420 kcal",
    },
    {
        _id: "6",
        name: "Bún Chả Hà Nội",
        price: 45000,
        image: "/assets/images/food/bun-cha.jpg",
        desc: "Chả viên nướng than, bún tươi, nước chấm chua ngọt",
        fullDesc:
            "Bún chả Hà Nội chuẩn vị với chả viên và chả miếng nướng than hoa thơm lừng. Bún tươi trắng dẻo, rau sống tươi mát. Nước chấm pha chua ngọt vừa vặn, thêm ớt tỏi.",
        time: "20 phút",
        tag: "Truyền thống",
        rating: 4.8,
        reviews: 267,
        category: "Bún/Phở",
        origin: "Hà Nội",
        calories: "480 kcal",
    },
    {
        _id: "7",
        name: "Bò Né Sài Gòn",
        price: 55000,
        image: "/assets/images/food/bo-ne.jpg",
        desc: "Bò bít tết sốt tiêu, trứng ốp la, bánh mì nóng",
        fullDesc:
            "Bò né kiểu Sài Gòn với miếng bò bít tết mỡ sốt tiêu đen đặc trưng, trứng ốp la lòng đào, pate béo ngậy. Ăn kèm bánh mì nóng giòn. Bữa sáng-đêm năng lượng.",
        time: "15 phút",
        tag: "Năng lượng",
        rating: 4.6,
        reviews: 178,
        category: "Cơm/Đồ ăn",
        origin: "Sài Gòn",
        calories: "580 kcal",
    },
    {
        _id: "8",
        name: "Mì Quảng",
        price: 45000,
        image: "/assets/images/food/mi-quang.jpg",
        desc: "Mì Quảng tôm thịt, nước lèo đậm đà, bánh tráng giòn",
        fullDesc:
            "Mì Quảng Đà Nẵng chính gốc với sợi mì vàng dai, nước lèo đậm đà nghệ và tôm thịt. Tôm tươi, thịt heo, trứng cút, rau sống, đậu phộng rang, bánh tráng nướng giòn.",
        time: "18 phút",
        tag: "Đặc sản",
        rating: 4.9,
        reviews: 234,
        category: "Bún/Phở",
        origin: "Đà Nẵng",
        calories: "500 kcal",
    },
    {
        _id: "9",
        name: "Cơm Gà Xối Mỡ",
        price: 50000,
        image: "/assets/images/food/com-ga-xoi-mo.jpg",
        desc: "Cơm gà xối mỡ giòn rụm, nước mắm tỏi ớt đặc biệt",
        fullDesc:
            "Cơm gà xối mỡ với đùi gà chiên giòn rụm vàng ươm, cơm dẻo thấm nước cốt gà. Nước mắm tỏi ớt pha đặc biệt, đồ chua dưa leo tươi. Phần ăn no bụng, giá phải chăng.",
        time: "20 phút",
        tag: "No bụng",
        rating: 4.7,
        reviews: 201,
        category: "Cơm",
        origin: "Sài Gòn",
        calories: "620 kcal",
    },
];

function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();

    const meal = allMeals.find((m) => m._id === id);

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
                            <Box
                                component="img"
                                src={meal.image}
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

export { allMeals };
export default ProductDetail;
