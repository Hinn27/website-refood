import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Chip,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionLayout from "../../components/layout/SectionLayout";

const mockOrders = [
    {
        id: "ORD-001",
        customer: "Nguyễn Văn A",
        date: "2026-03-20 18:30",
        total: 100000,
        status: "Đã hoàn thành",
    },
    {
        id: "ORD-002",
        customer: "Trần Thị B",
        date: "2026-03-21 21:15",
        total: 45000,
        status: "Đang giao",
    },
    {
        id: "ORD-003",
        customer: "Lê Văn C",
        date: "2026-03-21 22:00",
        total: 55000,
        status: "Chờ xác nhận",
    },
];

function Orders() {
    return (
        <SectionLayout sx={{ py: 6 }}>
            <AnimatedSection variant="fadeUp">
                <Typography variant="h3" fontWeight={700} sx={{ mb: 4 }}>
                    Quản Lý Đơn Hàng
                </Typography>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "action.hover" }}>
                                <TableCell sx={{ fontWeight: 700 }}>Mã Đơn</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Khách Hàng</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Ngày Đặt</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Tổng Tiền</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Trạng Thái</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">
                                    Thao Tác
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockOrders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.total.toLocaleString("vi-VN")}đ</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            size="small"
                                            color={
                                                order.status === "Đã hoàn thành"
                                                    ? "success"
                                                    : order.status === "Đang giao"
                                                    ? "warning"
                                                    : "info"
                                            }
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" size="small">
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default Orders;
