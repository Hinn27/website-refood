import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import MenuSection from "../components/home/MenuSection";
import QuanAn0dSection from "../components/home/QuanAn0dSection";
import VolunteerSection from "../components/home/VolunteerSection";

function Home() {
    return (
        <Box>
            {/* Hero Banner — Giới thiệu sứ mệnh ReFood */}
            <HeroSection />

            {/* Phân mục 1: Thực đơn đầy đủ — lọc theo danh mục */}
            <MenuSection />

            {/* Phân mục 2: Quán Ăn 0đ — menu + bản đồ */}
            <QuanAn0dSection />

            {/* Phân mục 3: Cổng đăng ký Nhóm thiện nguyện */}
            <VolunteerSection />
        </Box>
    );
}

export default Home;
