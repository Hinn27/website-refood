import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PageTransition from "./components/common/PageTransition";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";

function AppRoutes() {
    const location = useLocation();

    return (
        <PageTransition>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </PageTransition>
    );
}

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
                    <AppRoutes />
                </Box>
                <Footer />
            </Box>
        </BrowserRouter>
    );
}

export default App;
