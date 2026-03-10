import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
    CardContent,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

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

function ZeroDongMapSection() {
    return (
        <Box
            id="zero-dong"
            sx={{
                py: { xs: 8, md: 10 },
                bgcolor: (theme) =>
                    theme.palette.mode === "light"
                        ? "rgba(46,125,50,0.04)"
                        : "rgba(46,125,50,0.08)",
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mb: 1 }}
                    >
                        <StorefrontIcon color="secondary" fontSize="large" />
                        <Typography variant="h3" fontWeight={700}>
                            Bản Đồ Quán Ăn 0 Đồng
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

                <Grid container spacing={4}>
                    {/* Map placeholder */}
                    <Grid size={{ xs: 12, md: 7 }}>
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
                                Tích hợp bản đồ hiển thị vị trí các quán ăn 0
                                đồng trên toàn thành phố
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<LocationOnIcon />}
                            >
                                Mở bản đồ đầy đủ
                            </Button>
                        </Box>
                    </Grid>

                    {/* Restaurant list */}
                    <Grid size={{ xs: 12, md: 5 }}>
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
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ZeroDongMapSection;
