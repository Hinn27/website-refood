import PersonIcon from "@mui/icons-material/Person";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionLayout from "../../components/layout/SectionLayout";
import { useAuth } from "../../context/AuthContext";

function Profile() {
    const { user } = useAuth();
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Cập nhật thông tin (mock)
        alert("Đã cập nhật thông tin thành công!");
    };

    return (
        <SectionLayout sx={{ py: 6 }}>
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <PersonIcon color="primary" fontSize="large" />
                    <Typography variant="h3" fontWeight={700}>
                        Tài Khoản Của Tôi
                    </Typography>
                </Stack>
            </AnimatedSection>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnimatedSection variant="fadeRight" delay={0.1}>
                        <Card sx={{ textAlign: "center", py: 4 }}>
                            <CardContent>
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mx: "auto",
                                        mb: 2,
                                        bgcolor: "primary.main",
                                        fontSize: "2.5rem",
                                    }}
                                >
                                    {user?.name?.charAt(0) || "U"}
                                </Avatar>
                                <Typography variant="h5" fontWeight={700}>
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    {user?.email}
                                </Typography>
                                <Chip
                                    label={
                                        user?.role === "admin"
                                            ? "Quản trị viên"
                                            : "Thành viên"
                                    }
                                    color={
                                        user?.role === "admin"
                                            ? "secondary"
                                            : "primary"
                                    }
                                    variant="outlined"
                                    size="small"
                                />
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <AnimatedSection variant="fadeLeft" delay={0.2}>
                        <Card>
                            <CardContent sx={{ p: 4 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    gutterBottom
                                >
                                    Thông Tin Cá Nhân
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Họ và tên"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                value={form.email}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Số điện thoại"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Địa chỉ"
                                                name="address"
                                                multiline
                                                rows={3}
                                                value={form.address}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                sx={{
                                                    px: 4,
                                                    background:
                                                        "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                                }}
                                            >
                                                Lưu Thay Đổi
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

// Bổ sung Chip vì thiếu import
import { Chip } from "@mui/material";

export default Profile;
