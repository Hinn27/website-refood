import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
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
    Snackbar,
    Alert,
    Avatar,
} from "@mui/material";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionLayout from "../../components/layout/SectionLayout";
import { useMeals } from "../../context/useMeals";

function Products() {
    const { meals: allMeals, loading, seedDatabase, deleteMeal } = useMeals();
    const [seeding, setSeeding] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleSeed = async () => {
        try {
            setSeeding(true);
            const data = await seedDatabase();
            setSnackbar({ open: true, message: data.message || "Đã khởi tạo dữ liệu thành công!", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: error.message || "Lỗi khởi tạo dữ liệu. Hãy kiểm tra lại cấu hình DB.", severity: "error" });
        } finally {
            setSeeding(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
            try {
                await deleteMeal(id);
                setSnackbar({ open: true, message: "Đã xóa món ăn thành công!", severity: "success" });
            } catch (error) {
                setSnackbar({ open: true, message: "Lỗi khi xóa món ăn.", severity: "error" });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (loading && !seeding) return null;

    return (
        <SectionLayout sx={{ py: 6 }}>
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 4 }}
                >
                    <Typography variant="h3" fontWeight={700}>
                        Quản Lý Sản Phẩm
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            disabled={seeding}
                            onClick={handleSeed}
                            sx={{ borderColor: "#E8651A", color: "#E8651A" }}
                        >
                            {seeding ? "Đang khởi tạo..." : "Khởi tạo dữ liệu mẫu"}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                background: "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                            }}
                        >
                            Thêm Sản Phẩm
                        </Button>
                    </Stack>
                </Stack>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "action.hover" }}>
                                <TableCell sx={{ fontWeight: 700 }}>Ảnh</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Tên Sản Phẩm</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Danh Mục</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Giá</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Trạng Thái</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">
                                    Thao Tác
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allMeals.map((meal) => (
                                <TableRow key={meal._id} hover>
                                    <TableCell>
                                        <Avatar
                                            src={meal.image}
                                            variant="rounded"
                                            sx={{ width: 50, height: 50 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{meal.name}</TableCell>
                                    <TableCell>{meal.category}</TableCell>
                                    <TableCell>{meal.price.toLocaleString("vi-VN")}đ</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="success.main">
                                            Đang bán
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            size="small"
                                            onClick={() => handleDelete(meal._id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AnimatedSection>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SectionLayout>
    );
}

export default Products;
