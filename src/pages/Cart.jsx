import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";
import { useCart } from "../context/CartContext";

function Cart() {
    const {
        items,
        totalItems,
        totalPrice,
        removeItem,
        updateQuantity,
        clearCart,
    } = useCart();

    if (items.length === 0) {
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
                        <RemoveShoppingCartIcon
                            sx={{
                                fontSize: 80,
                                color: "text.secondary",
                                opacity: 0.4,
                            }}
                        />
                        <Typography variant="h4" fontWeight={700}>
                            Giỏ hàng trống
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Hãy thêm món ăn vào giỏ để đặt suất ăn đêm cho các
                            cô chú lao động nhé!
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={RouterLink}
                            to="/menu"
                            startIcon={<ShoppingCartIcon />}
                            sx={{
                                background:
                                    "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                },
                            }}
                        >
                            Xem Thực Đơn
                        </Button>
                    </Stack>
                </AnimatedSection>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <ShoppingCartIcon color="primary" fontSize="large" />
                    <Typography variant="h3" fontWeight={700}>
                        Giỏ Hàng
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                    >
                        ({totalItems} món)
                    </Typography>
                </Stack>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.15}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                    {/* Items list */}
                    <Box sx={{ flex: 1 }}>
                        <Stack spacing={2}>
                            {items.map((item) => (
                                <Card key={item._id}>
                                    <CardContent
                                        sx={{
                                            py: 2,
                                            "&:last-child": { pb: 2 },
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Box
                                                component="img"
                                                src={item.image}
                                                alt={item.name}
                                                sx={{
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 2,
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={700}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="primary"
                                                    fontWeight={700}
                                                >
                                                    {item.price.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    đ
                                                </Typography>
                                            </Box>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                    }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={700}
                                                    sx={{
                                                        minWidth: 32,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                    }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                color="primary"
                                                sx={{
                                                    minWidth: 100,
                                                    textAlign: "right",
                                                }}
                                            >
                                                {(
                                                    item.price * item.quantity
                                                ).toLocaleString("vi-VN")}
                                                đ
                                            </Typography>
                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    removeItem(item._id)
                                                }
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mt: 2 }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                component={RouterLink}
                                to="/menu"
                            >
                                Tiếp tục chọn món
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteOutlineIcon />}
                                onClick={clearCart}
                            >
                                Xóa giỏ hàng
                            </Button>
                        </Stack>
                    </Box>

                    {/* Order summary */}
                    <Card
                        sx={{
                            width: { xs: "100%", md: 360 },
                            height: "fit-content",
                            position: { md: "sticky" },
                            top: { md: 100 },
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{ mb: 3 }}
                            >
                                Tổng Đơn Hàng
                            </Typography>
                            <Stack spacing={1.5}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="text.secondary">
                                        Tạm tính ({totalItems} món)
                                    </Typography>
                                    <Typography fontWeight={600}>
                                        {totalPrice.toLocaleString("vi-VN")}đ
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="text.secondary">
                                        Phí giao hàng
                                    </Typography>
                                    <Typography
                                        fontWeight={600}
                                        color="secondary"
                                    >
                                        Miễn phí
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="h6" fontWeight={700}>
                                        Tổng cộng
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight={800}
                                        color="primary"
                                    >
                                        {totalPrice.toLocaleString("vi-VN")}đ
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<ShoppingCartCheckoutIcon />}
                                component={RouterLink}
                                to="/checkout"
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                    },
                                }}
                            >
                                Tiến Hành Đặt Hàng
                            </Button>
                        </CardContent>
                    </Card>
                </Stack>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default Cart;
