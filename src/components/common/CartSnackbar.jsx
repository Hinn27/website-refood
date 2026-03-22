import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { memo } from "react";

const alertSx = {
    background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
    fontWeight: 600,
};

/**
 * CartSnackbar — Hiển thị thông báo khi thêm sản phẩm vào giỏ hàng.
 * Sử dụng context useCart để lấy trạng thái và hàm đóng.
 * Nếu muốn mở rộng, có thể truyền thêm props cho duration hoặc anchorOrigin.
 */
function CartSnackbar() {
    const { snackbar, closeSnackbar } = useCart();
    const show = snackbar.open && Boolean(snackbar.message);

    // Memo hóa action để tránh tạo lại mỗi lần render
    const action = useMemo(
        () => (
            <IconButton size="small" color="inherit" onClick={closeSnackbar}>
                <CloseIcon fontSize="small" />
            </IconButton>
        ),
        [closeSnackbar]
    );

    return (
        <Snackbar
            open={show}
            autoHideDuration={2500}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            {show && (
                <Alert
                    onClose={closeSnackbar}
                    severity="success"
                    variant="filled"
                    icon={<AddShoppingCartIcon />}
                    action={action}
                    sx={alertSx}
                    role="status"
                >
                    {snackbar.message}
                </Alert>
            )}
        </Snackbar>
    );
}

export default memo(CartSnackbar);
