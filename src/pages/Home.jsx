import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
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

            {/* Phân mục 2: Bản đồ các Quán ăn 0 đồng */}
            <ZeroDongMapSection />

            {/* Phân mục 3: Cổng đăng ký Nhóm thiện nguyện */}
            <VolunteerSection />
        </Box>
    );
}

export default Home;
