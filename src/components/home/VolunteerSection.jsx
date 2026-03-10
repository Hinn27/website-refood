import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ElderlyIcon from "@mui/icons-material/Elderly";
import GroupsIcon from "@mui/icons-material/Groups";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

const volunteerBenefits = [
    {
        icon: <ElderlyIcon sx={{ fontSize: 40 }} />,
        title: "Chăm sóc người già neo đơn",
        desc: "Giao bữa ăn miễn phí hàng ngày đến tận nhà các cụ ông, cụ bà neo đơn trong khu vực",
    },
    {
        icon: <DeliveryDiningIcon sx={{ fontSize: 40 }} />,
        title: "Giao suất ăn đêm",
        desc: "Tham gia đội giao hàng đêm, mang bữa ăn ấm lòng cho người lao động ca đêm",
    },
    {
        icon: <GroupsIcon sx={{ fontSize: 40 }} />,
        title: "Xây dựng cộng đồng",
        desc: "Kết nối với hàng trăm nhóm thiện nguyện, cùng nhau tạo nên mạng lưới yêu thương",
    },
];

const impactStats = [
    { number: "10,000+", label: "Suất ăn đã trao" },
    { number: "500+", label: "Tình nguyện viên" },
    { number: "50+", label: "Quán ăn 0 đồng" },
    { number: "1,200+", label: "Người già được hỗ trợ" },
];

function VolunteerSection() {
    return (
        <Box
            id="volunteer"
            sx={{
                py: { xs: 8, md: 10 },
                bgcolor: "background.default",
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
                        <VolunteerActivismIcon
                            color="secondary"
                            fontSize="large"
                        />
                        <Typography variant="h3" fontWeight={700}>
                            Cổng Đăng Ký Thiện Nguyện
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: "auto" }}
                    >
                        Hãy cùng chúng tôi mang yêu thương đến với những người
                        cần giúp đỡ — Đăng ký nhóm thiện nguyện ngay hôm nay
                    </Typography>
                </Box>

                <Grid container spacing={5}>
                    {/* Registration form */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                p: { xs: 2, md: 3 },
                                border: "2px solid",
                                borderColor: "secondary.light",
                                background: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "linear-gradient(180deg, #FFFFFF 0%, #E8F5E9 100%)"
                                        : "linear-gradient(180deg, #1E1E1E 0%, #0a1f0d 100%)",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    sx={{ mb: 3 }}
                                >
                                    📝 Đăng Ký Nhóm Thiện Nguyện
                                </Typography>
                                <Stack spacing={2.5}>
                                    <TextField
                                        fullWidth
                                        label="Tên nhóm thiện nguyện"
                                        placeholder="VD: Nhóm Bếp Yêu Thương Q.1"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Người đại diện"
                                        placeholder="Họ và tên người đại diện"
                                        variant="outlined"
                                    />
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Số điện thoại"
                                            placeholder="0901 234 567"
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            placeholder="email@example.com"
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <TextField
                                        fullWidth
                                        label="Khu vực hoạt động"
                                        placeholder="VD: Quận 1, TP.HCM"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Hoạt động muốn tham gia"
                                        select
                                        defaultValue=""
                                        variant="outlined"
                                    >
                                        <MenuItem value="">
                                            -- Chọn hoạt động --
                                        </MenuItem>
                                        <MenuItem value="elderly">
                                            Giao cơm cho người già neo đơn
                                        </MenuItem>
                                        <MenuItem value="night">
                                            Giao suất ăn đêm cho lao động
                                        </MenuItem>
                                        <MenuItem value="kitchen">
                                            Hỗ trợ quán ăn 0 đồng
                                        </MenuItem>
                                        <MenuItem value="all">
                                            Tất cả hoạt động
                                        </MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        label="Số thành viên"
                                        placeholder="VD: 15"
                                        variant="outlined"
                                        type="number"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Lời nhắn (không bắt buộc)"
                                        placeholder="Chia sẻ thêm về nhóm của bạn..."
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                    />
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<VolunteerActivismIcon />}
                                        sx={{
                                            py: 1.8,
                                            background:
                                                "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                                            },
                                        }}
                                    >
                                        Gửi Đăng Ký
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Benefits & Impact */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                            {/* Benefits */}
                            {volunteerBenefits.map((benefit, index) => (
                                <Card key={index}>
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="flex-start"
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "secondary.light",
                                                    color: "#fff",
                                                    width: 56,
                                                    height: 56,
                                                }}
                                            >
                                                {benefit.icon}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={700}
                                                    gutterBottom
                                                >
                                                    {benefit.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {benefit.desc}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Impact stats */}
                            <Card
                                sx={{
                                    bgcolor: "secondary.main",
                                    color: "#fff",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        sx={{ mb: 2, textAlign: "center" }}
                                    >
                                        ✨ Tác Động Của Chúng Ta
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {impactStats.map((stat, index) => (
                                            <Grid size={{ xs: 6 }} key={index}>
                                                <Box
                                                    sx={{ textAlign: "center" }}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        fontWeight={800}
                                                    >
                                                        {stat.number}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ opacity: 0.9 }}
                                                    >
                                                        {stat.label}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default VolunteerSection;
