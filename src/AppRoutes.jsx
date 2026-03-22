import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageTransition from "./components/common/PageTransition";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ROUTES } from "./routes";

// lazy load giam kich thuoc ban dau va chi tai khi can thiet
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Menu = lazy(() => import("./pages/Menu"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/user/Profile"));
const UserOrders = lazy(() => import("./pages/user/Orders"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));

// load nhung trang can thiet khi nguoi dung keo den
function AppRoutes() {
  const location = useLocation();
  return (
    <PageTransition>
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />

          {/* User Routes */}
          <Route path={ROUTES.PROFILE} element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.ORDERS} element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path={ROUTES.ADMIN} element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.ADMIN_PRODUCTS} element={
            <ProtectedRoute adminOnly>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.ADMIN_ORDERS} element={
            <ProtectedRoute adminOnly>
              <AdminOrders />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

export default AppRoutes;

