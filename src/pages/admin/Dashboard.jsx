import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionLayout from "../../components/layout/SectionLayout";

const stats = [
    {
        label: "Tổng Doanh Thu",
        value: "15,200,000đ",
        icon: <TrendingUpIcon />,
        color: "#2E7D32",
    },
    {
        label: "Đơn Hàng Mới",
        value: "24",
        icon: <ShoppingBasketIcon />,
        color: "#E8651A",
    },
    {
        label: "Người Dùng",
        value: "156",
        icon: <GroupIcon />,
        color: "#1976D2",
    },
    {
        label: "Tỉ Lệ Hoàn Thành",
        value: "95%",
        icon: <AssessmentIcon />,
        color: "#9C27B0",
    },
];

function Dashboard() {
    return (
        <SectionLayout sx={{ py: 6 }}>
            <AnimatedSection variant="fadeUp">
                <Typography variant="h3" fontWeight={700} sx={{ mb: 4 }}>
                    Admin Dashboard
                </Typography>
            </AnimatedSection>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                        <AnimatedSection variant="scale" delay={idx * 0.1}>
                            <Card>
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                bgcolor: `${stat.color}15`,
                                                color: stat.color,
                                                display: "flex",
                                            }}
                                        >
                                            {stat.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {stat.label}
                                            </Typography>
                                            <Typography variant="h5" fontWeight={700}>
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <AnimatedSection variant="fadeUp" delay={0.4}>
                        <Paper sx={{ p: 3, height: "100%" }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                Đơn Hàng Gần Đây
                            </Typography>
                            <Typography color="text.secondary">
                                (Biểu đồ hoặc danh sách rút gọn sẽ hiển thị ở đây)
                            </Typography>
                            <Box sx={{ mt: 2, py: 4, textAlign: "center", border: "1px dashed #ccc", borderRadius: 2 }}>
                                Chức năng đang được hoàn thiện
                            </Box>
                        </Paper>
                    </AnimatedSection>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnimatedSection variant="fadeUp" delay={0.5}>
                        <Paper sx={{ p: 3, height: "100%" }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                Hoạt Động Hệ Thống
                            </Typography>
                            <Stack spacing={2}>
                                {[1, 2, 3].map((i) => (
                                    <Box key={i} sx={{ pb: 1, borderBottom: "1px solid #eee" }}>
                                        <Typography variant="body2" fontWeight={600}>
                                            Người dùng mới đăng ký
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {i * 10} phút trước
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

export default Dashboard;
