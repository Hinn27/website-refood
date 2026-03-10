import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Navbar />
                <Box component="main" sx={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* thêm các trang Giỏ hàng (Cart), Checkout,... */}
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </BrowserRouter>
    );
}

export default App;
