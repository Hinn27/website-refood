import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import {
    Alert,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SectionLayout from "../components/layout/SectionLayout";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const steps = ["Thông tin giao hàng", "Thanh toán", "Hoàn tất"];

function Checkout() {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState("");

    const [shippingInfo, setShippingInfo] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: "",
        district: "",
        note: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
        setError("");
    };

    const handleNext = () => {
        if (activeStep === 0) {
            if (
                !shippingInfo.name ||
                !shippingInfo.phone ||
                !shippingInfo.address
            ) {
                setError("Vui lòng nhập đầy đủ thông tin giao hàng");
                return;
            }
        }
        setError("");
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handlePlaceOrder = () => {
        // Mock order — thay bằng API
        setActiveStep(2);
        clearCart();
    };

    if (items.length === 0 && activeStep < 2) {
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
                <Stack alignItems="center" spacing={3}>
                    <Typography variant="h4" fontWeight={700}>
                        Chưa có món nào trong giỏ
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/menu"
                        sx={{
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                        }}
                    >
                        Quay lại thực đơn
                    </Button>
                </Stack>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            variant="medium"
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            <Typography variant="h3" fontWeight={700} sx={{ mb: 4 }}>
                Đặt Hàng
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Step 1: Shipping */}
            {activeStep === 0 && (
                <Card sx={{ p: { xs: 2, md: 3 } }}>
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mb: 3 }}
                        >
                            <LocalShippingIcon color="primary" />
                            <Typography variant="h5" fontWeight={700}>
                                Thông Tin Giao Hàng
                            </Typography>
                        </Stack>
                        <Stack spacing={2.5}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                            >
                                <TextField
                                    fullWidth
                                    label="Họ và tên người nhận"
                                    name="name"
                                    value={shippingInfo.name}
                                    onChange={handleShippingChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    name="phone"
                                    value={shippingInfo.phone}
                                    onChange={handleShippingChange}
                                />
                            </Stack>
                            <TextField
                                fullWidth
                                label="Địa chỉ giao hàng"
                                name="address"
                                placeholder="Số nhà, đường, phường/xã..."
                                value={shippingInfo.address}
                                onChange={handleShippingChange}
                            />
                            <TextField
                                fullWidth
                                label="Quận / Huyện"
                                name="district"
                                select
                                value={shippingInfo.district}
                                onChange={handleShippingChange}
                            >
                                <MenuItem value="">-- Chọn quận --</MenuItem>
                                <MenuItem value="q1">Quận 1</MenuItem>
                                <MenuItem value="q3">Quận 3</MenuItem>
                                <MenuItem value="q5">Quận 5</MenuItem>
                                <MenuItem value="q7">Quận 7</MenuItem>
                                <MenuItem value="q10">Quận 10</MenuItem>
                                <MenuItem value="bt">Bình Thạnh</MenuItem>
                                <MenuItem value="td">Thủ Đức</MenuItem>
                                <MenuItem value="hc">Hải Châu</MenuItem>
                                <MenuItem value="tc">Thanh Khê</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Ghi chú giao hàng (không bắt buộc)"
                                name="note"
                                placeholder="VD: Giao ca đêm, gọi trước khi đến..."
                                value={shippingInfo.note}
                                onChange={handleShippingChange}
                                multiline
                                rows={2}
                            />
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleNext}
                                sx={{
                                    py: 1.5,
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                    },
                                }}
                            >
                                Tiếp Tục → Thanh Toán
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Payment */}
            {activeStep === 1 && (
                <Stack spacing={3}>
                    <Card sx={{ p: { xs: 2, md: 3 } }}>
                        <CardContent>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ mb: 3 }}
                            >
                                <PaymentIcon color="primary" />
                                <Typography variant="h5" fontWeight={700}>
                                    Phương Thức Thanh Toán
                                </Typography>
                            </Stack>
                            <FormControl>
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="cod"
                                        control={<Radio color="primary" />}
                                        label="💵 Thanh toán khi nhận hàng (COD)"
                                    />
                                    <FormControlLabel
                                        value="momo"
                                        control={<Radio color="primary" />}
                                        label="📱 Ví MoMo"
                                    />
                                    <FormControlLabel
                                        value="bank"
                                        control={<Radio color="primary" />}
                                        label="🏦 Chuyển khoản ngân hàng"
                                    />
                                    <FormControlLabel
                                        value="free"
                                        control={<Radio color="secondary" />}
                                        label="❤️ Suất ăn thiện nguyện (Miễn phí)"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>

                    {/* Order summary */}
                    <Card sx={{ p: { xs: 2, md: 3 } }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{ mb: 2 }}
                            >
                                Xác Nhận Đơn Hàng
                            </Typography>
                            <Stack spacing={1} sx={{ mb: 2 }}>
                                {items.map((item) => (
                                    <Stack
                                        key={item._id}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography color="text.secondary">
                                            {item.name} × {item.quantity}
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString("vi-VN")}
                                            đ
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography color="text.secondary">
                                    Phí giao hàng
                                </Typography>
                                <Typography fontWeight={600} color="secondary">
                                    Miễn phí
                                </Typography>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography variant="h5" fontWeight={700}>
                                    Tổng cộng
                                </Typography>
                                <Typography
                                    variant="h5"
                                    fontWeight={800}
                                    color="primary"
                                >
                                    {paymentMethod === "free"
                                        ? "0đ"
                                        : `${totalPrice.toLocaleString("vi-VN")}đ`}
                                </Typography>
                            </Stack>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                📍 Giao đến: {shippingInfo.address}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                            sx={{ flex: 1 }}
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<CheckCircleIcon />}
                            onClick={handlePlaceOrder}
                            sx={{
                                flex: 2,
                                py: 1.5,
                                background:
                                    "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                                },
                            }}
                        >
                            Xác Nhận Đặt Hàng
                        </Button>
                    </Stack>
                </Stack>
            )}

            {/* Step 3: Success */}
            {activeStep === 2 && (
                <Card sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
                    <CardContent>
                        <CelebrationIcon
                            sx={{
                                fontSize: 80,
                                color: "secondary.main",
                                mb: 2,
                            }}
                        />
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{ mb: 2 }}
                        >
                            Đặt Hàng Thành Công! 🎉
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 1, maxWidth: 480, mx: "auto" }}
                        >
                            Cảm ơn bạn đã sử dụng ReFoodVN! Đơn hàng của bạn
                            đang được chuẩn bị và sẽ giao trong thời gian sớm
                            nhất.
                        </Typography>
                        <Typography
                            variant="body2"
                            color="secondary"
                            fontWeight={600}
                            sx={{ mb: 4 }}
                        >
                            Mã đơn hàng: #RF
                            {Date.now().toString().slice(-6)}
                        </Typography>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/"
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                }}
                            >
                                Về Trang Chủ
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                component={RouterLink}
                                to="/menu"
                            >
                                Tiếp Tục Đặt Món
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </SectionLayout>
    );
}

export default Checkout;
