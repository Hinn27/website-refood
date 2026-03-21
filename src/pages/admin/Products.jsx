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
    Avatar,
} from "@mui/material";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionLayout from "../../components/layout/SectionLayout";
import { allMeals } from "../../utils/mealsData";

function Products() {
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
                                        <IconButton color="error" size="small">
                                            <DeleteIcon fontSize="small" />
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

export default Products;
