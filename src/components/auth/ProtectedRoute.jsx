import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Chuyển hướng đến trang login nhưng lưu lại vị trí hiện tại
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && user.role !== "admin") {
        // Nếu yêu cầu quyền admin mà user không phải admin, chuyển về trang chủ
        return <Navigate to="/" replace />;
    }

    return children;
}
