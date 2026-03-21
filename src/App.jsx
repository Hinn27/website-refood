import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CartSnackbar from "./components/common/CartSnackbar";
import MobileSpeedDial from "./components/common/MobileSpeedDial";
import PageTransition from "./components/common/PageTransition";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Profile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";

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
                
                {/* User Routes */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <UserOrders />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                    <ProtectedRoute adminOnly>
                        <AdminProducts />
                    </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                    <ProtectedRoute adminOnly>
                        <AdminOrders />
                    </ProtectedRoute>
                } />
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
                <CartSnackbar />
                <MobileSpeedDial />
            </Box>
        </BrowserRouter>
    );
}

export default App;
