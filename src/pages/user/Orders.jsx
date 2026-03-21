import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionLayout from "../../components/layout/SectionLayout";

const mockOrders = [
    {
        id: "ORD-001",
        date: "2026-03-20 18:30",
        total: 100000,
        status: "Đã hoàn thành",
        items: [
            { name: "Phở Bò Gia Truyền", quantity: 2, price: 50000 },
        ],
    },
    {
        id: "ORD-002",
        date: "2026-03-21 21:15",
        total: 45000,
        status: "Đang giao",
        items: [
            { name: "Cơm Tấm Sườn Nướng", quantity: 1, price: 45000 },
        ],
    },
];

function Orders() {
    return (
        <SectionLayout sx={{ py: 6 }}>
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <ReceiptLongIcon color="primary" fontSize="large" />
                    <Typography variant="h3" fontWeight={700}>
                        Lịch Sử Đơn Hàng
                    </Typography>
                </Stack>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
                {mockOrders.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            Bạn chưa có đơn hàng nào
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={3}>
                        {mockOrders.map((order) => (
                            <Card key={order.id}>
                                <CardContent sx={{ p: 3 }}>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        justifyContent="space-between"
                                        alignItems={{ sm: "center" }}
                                        spacing={2}
                                        sx={{ mb: 2 }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={700}
                                            >
                                                Mã đơn: {order.id}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Ngày đặt: {order.date}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={order.status}
                                            color={
                                                order.status === "Đã hoàn thành"
                                                    ? "success"
                                                    : "warning"
                                            }
                                            variant="tonal"
                                        />
                                    </Stack>
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack spacing={1.5} sx={{ mb: 2 }}>
                                        {order.items.map((item, idx) => (
                                            <Stack
                                                key={idx}
                                                direction="row"
                                                justifyContent="space-between"
                                            >
                                                <Typography variant="body2">
                                                    {item.name} x {item.quantity}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                >
                                                    {(
                                                        item.price * item.quantity
                                                    ).toLocaleString("vi-VN")}
                                                    đ
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                    <Divider sx={{ mb: 2, borderStyle: "dashed" }} />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography variant="h6" fontWeight={700}>
                                            Tổng cộng
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight={800}
                                            color="primary"
                                        >
                                            {order.total.toLocaleString("vi-VN")}đ
                                        </Typography>
                                    </Stack>
                                    <Box sx={{ mt: 2, textAlign: "right" }}>
                                        <Button variant="outlined" size="small">
                                            Xem chi tiết
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </AnimatedSection>
        </SectionLayout>
    );
}

export default Orders;
