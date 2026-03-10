import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import SectionLayout from "../components/layout/SectionLayout";
import { useCart } from "../context/CartContext";
import { allMeals } from "./ProductDetail";

const categories = ["Tất cả", "Bún/Phở", "Cơm", "Bánh mì", "Cơm/Đồ ăn"];

function Menu() {
    const { addItem } = useCart();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tất cả");

    const filteredMeals = useMemo(() => {
        return allMeals.filter((meal) => {
            const matchSearch = meal.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchCategory =
                category === "Tất cả" || meal.category === category;
            return matchSearch && matchCategory;
        });
    }, [search, category]);

    const handleAddToCart = (meal) => {
        addItem({
            _id: meal._id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
        });
    };

    return (
        <SectionLayout
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            {/* Header */}
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <RestaurantMenuIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                    <Typography variant="h3" fontWeight={700}>
                        Thực Đơn
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Các món ăn phục vụ 24/7 — Đặc biệt hỗ trợ ca đêm
                    </Typography>
                </Box>
            </Stack>

            {/* Search & Filter */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ md: "center" }}
                sx={{ mb: 4, mt: 3 }}
            >
                <TextField
                    placeholder="Tìm món ăn..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ minWidth: { md: 320 } }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <ToggleButtonGroup
                    value={category}
                    exclusive
                    onChange={(e, val) => val && setCategory(val)}
                    size="small"
                    sx={{
                        flexWrap: "wrap",
                        "& .MuiToggleButton-root": {
                            borderRadius: "20px !important",
                            border: "1px solid",
                            borderColor: "divider",
                            mx: 0.5,
                            my: 0.5,
                            px: 2,
                            textTransform: "none",
                            fontWeight: 500,
                            "&.Mui-selected": {
                                bgcolor: "primary.main",
                                color: "#fff",
                                "&:hover": {
                                    bgcolor: "primary.dark",
                                },
                            },
                        },
                    }}
                >
                    {categories.map((cat) => (
                        <ToggleButton key={cat} value={cat}>
                            {cat}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>

            {/* Results count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tìm thấy <strong>{filteredMeals.length}</strong> món ăn
            </Typography>

            {/* Meals grid */}
            {filteredMeals.length === 0 ? (
                <Box
                    sx={{
                        textAlign: "center",
                        py: 8,
                    }}
                >
                    <Typography variant="h5" color="text.secondary">
                        Không tìm thấy món ăn phù hợp
                    </Typography>
                    <Button
                        sx={{ mt: 2 }}
                        onClick={() => {
                            setSearch("");
                            setCategory("Tất cả");
                        }}
                    >
                        Xóa bộ lọc
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredMeals.map((meal) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            key={meal._id}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                }}
                            >
                                <Chip
                                    label={meal.tag}
                                    size="small"
                                    icon={<LocalFireDepartmentIcon />}
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        zIndex: 2,
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        fontWeight: 600,
                                        "& .MuiChip-icon": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                                <CardActionArea
                                    component={RouterLink}
                                    to={`/product/${meal._id}`}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={meal.image}
                                        alt={meal.name}
                                        sx={{ objectFit: "cover" }}
                                    />
                                </CardActionArea>
                                <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        gutterBottom
                                        component={RouterLink}
                                        to={`/product/${meal._id}`}
                                        sx={{
                                            textDecoration: "none",
                                            color: "text.primary",
                                            "&:hover": {
                                                color: "primary.main",
                                            },
                                        }}
                                    >
                                        {meal.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 1.5,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {meal.desc}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{ mb: 1 }}
                                    >
                                        <StarIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "#FFB400",
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            fontWeight={600}
                                        >
                                            {meal.rating}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            • {meal.origin}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={0.3}
                                            alignItems="center"
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    fontSize: 13,
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
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            fontWeight={800}
                                        >
                                            {meal.price.toLocaleString("vi-VN")}
                                            đ
                                        </Typography>
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleAddToCart(meal)
                                            }
                                            sx={{
                                                bgcolor: "primary.main",
                                                color: "#fff",
                                                width: 40,
                                                height: 40,
                                                "&:hover": {
                                                    bgcolor: "primary.dark",
                                                },
                                            }}
                                        >
                                            <AddShoppingCartIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </SectionLayout>
    );
}

export default Menu;
