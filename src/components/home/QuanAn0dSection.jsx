import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import PhoneIcon from "@mui/icons-material/Phone";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AnimatedSection, { MotionBox } from "../common/AnimatedSection";
import { staggerContainer, staggerItem } from "../../utils/animations";
import SectionLayout from "../layout/SectionLayout";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import { useMeals } from "../../context/useMeals";

const zeroDongRestaurants = [
    {
        id: 1,
        name: "Quán Cơm Từ Bi",
        address: "125 Nguyễn Thị Minh Khai, Q.1, TP.HCM",
        hours: "11:00 – 13:00 | Thứ 2, 4, 6",
        served: "200+ suất/ngày",
        phone: "0901 234 567",
        avatar: "🍚",
        status: "Đang mở",
    },
    {
        id: 2,
        name: "Quán Ăn Yêu Thương",
        address: "45 Lê Văn Sỹ, Q.3, TP.HCM",
        hours: "10:30 – 12:30 | Hàng ngày",
        served: "150+ suất/ngày",
        phone: "0912 345 678",
        avatar: "🥘",
        status: "Đang mở",
    },
    {
        id: 3,
        name: "Bếp Ấm Tình Người",
        address: "78 Trần Hưng Đạo, Q.5, TP.HCM",
        hours: "11:00 – 13:00 | Thứ 3, 5, 7",
        served: "180+ suất/ngày",
        phone: "0923 456 789",
        avatar: "🍲",
        status: "Tạm nghỉ",
    },
    {
        id: 4,
        name: "Quán Cơm 0 Đồng Bình An",
        address: "201 Cách Mạng Tháng 8, Q.10, TP.HCM",
        hours: "11:00 – 12:30 | Hàng ngày",
        served: "300+ suất/ngày",
        phone: "0934 567 890",
        avatar: "🍛",
        status: "Đang mở",
    },
];

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
    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

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

    // Use top 6 meals for 0đ section
    const quanAn0dMeals = meals.slice(0, 6).map((meal) => ({
        ...meal,
        price: 0, // Đổi giá thành 0đ như yêu cầu
    }));

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
                        <Grid xs={12} sm={6} md={4} key={meal._id}>
                            <MotionBox variants={staggerItem}>
                                <Card sx={CARD_SX}>
                                    {/* Tag */}
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
                                            }}
                                        />
                                    </CardActionArea>
                                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            gutterBottom
                                            noWrap
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
                                                minHeight: "2.5em",
                                            }}
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
                                                    sx={ICON_BUTTON_SX}
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

            {/* Divider */}
            <Divider sx={{ my: 6 }} />

            {/* Bản đồ Quán Ăn 0đ */}
            <AnimatedSection variant="fadeUp">
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mb: 1 }}
                    >
                        <MapIcon color="secondary" fontSize="large" />
                        <Typography variant="h4" fontWeight={700}>
                            Bản Đồ Quán Ăn 0đ
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: "auto" }}
                    >
                        Tìm các quán ăn thiện nguyện gần bạn — Nơi mỗi bữa cơm
                        là một tấm lòng, mỗi suất ăn là một yêu thương
                    </Typography>
                </Box>
            </AnimatedSection>

            <Grid container spacing={4}>
                {/* Map placeholder */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <AnimatedSection variant="fadeRight" delay={0.1}>
                        <Box
                            sx={{
                                height: { xs: 300, md: 480 },
                                borderRadius: 4,
                                overflow: "hidden",
                                bgcolor: "background.paper",
                                border: "2px dashed",
                                borderColor: "secondary.light",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                            }}
                        >
                            <MapIcon
                                sx={{ fontSize: 80, color: "secondary.light" }}
                            />
                            <Typography variant="h6" color="text.secondary">
                                Bản đồ Google Maps
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ maxWidth: 300, textAlign: "center" }}
                            >
                                Tích hợp bản đồ hiển thị vị trí các quán ăn 0đ
                                trên toàn thành phố
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<LocationOnIcon />}
                            >
                                Mở bản đồ đầy đủ
                            </Button>
                        </Box>
                    </AnimatedSection>
                </Grid>

                {/* Restaurant list */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <AnimatedSection variant="fadeLeft" delay={0.2}>
                        <Stack spacing={2}>
                            {zeroDongRestaurants.map((restaurant) => (
                                <Card
                                    key={restaurant.id}
                                    sx={{
                                        "&:hover": {
                                            borderLeft: "4px solid",
                                            borderColor: "secondary.main",
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            py: 2,
                                            "&:last-child": { pb: 2 },
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="flex-start"
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "secondary.light",
                                                    width: 48,
                                                    height: 48,
                                                    fontSize: 24,
                                                }}
                                            >
                                                {restaurant.avatar}
                                            </Avatar>
                                            <Box sx={{ flex: 1 }}>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight={700}
                                                    >
                                                        {restaurant.name}
                                                    </Typography>
                                                    <Chip
                                                        label={
                                                            restaurant.status
                                                        }
                                                        size="small"
                                                        color={
                                                            restaurant.status ===
                                                            "Đang mở"
                                                                ? "success"
                                                                : "default"
                                                        }
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: "0.7rem",
                                                        }}
                                                    />
                                                </Stack>
                                                <Stack
                                                    spacing={0.5}
                                                    sx={{ mt: 0.5 }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={0.5}
                                                        alignItems="center"
                                                    >
                                                        <LocationOnIcon
                                                            sx={{
                                                                fontSize: 14,
                                                                color: "text.secondary",
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {restaurant.address}
                                                        </Typography>
                                                    </Stack>
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
                                                            {restaurant.hours}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing={0.5}
                                                            alignItems="center"
                                                        >
                                                            <PeopleIcon
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: "secondary.main",
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="caption"
                                                                color="secondary"
                                                                fontWeight={600}
                                                            >
                                                                {
                                                                    restaurant.served
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Stack
                                                            direction="row"
                                                            spacing={0.5}
                                                            alignItems="center"
                                                        >
                                                            <PhoneIcon
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: "text.secondary",
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    restaurant.phone
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

export default QuanAn0dSection;
