import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import MenuSection from "../components/home/MenuSection";
import NightMealSection from "../components/home/NightMealSection";
import VolunteerSection from "../components/home/VolunteerSection";
import ZeroDongMapSection from "../components/home/ZeroDongMapSection";

function Home() {
    return (
        <Box>
            {/* Hero Banner — Giới thiệu sứ mệnh ReFoodVN */}
            <HeroSection />

            {/* Phân mục 1: Đặt suất ăn đêm cho người lao động */}
            <NightMealSection />

            {/* Phân mục 2: Thực đơn đầy đủ — lọc theo danh mục */}
            <MenuSection />

            {/* Phân mục 3: Bản đồ các Quán ăn 0 đồng */}
            <ZeroDongMapSection />

            {/* Phân mục 4: Cổng đăng ký Nhóm thiện nguyện */}
            <VolunteerSection />
        </Box>
    );
}

export default Home;
