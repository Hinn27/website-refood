import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext";

/**
 * CartSnackbar — Hiển thị thông báo khi thêm sản phẩm vào giỏ hàng.
 * Sử dụng context useCart để lấy trạng thái và hàm đóng.
 * Nếu muốn mở rộng, có thể truyền thêm props cho duration hoặc anchorOrigin.
 */
function CartSnackbar() {
    const { snackbar, closeSnackbar } = useCart();

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={2500}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Alert
                onClose={closeSnackbar}
                severity="success"
                variant="filled"
                icon={<AddShoppingCartIcon />}
                action={
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={closeSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                sx={{
                    background:
                        "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                    fontWeight: 600,
                }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}

CartSnackbar.propTypes = {};

export default CartSnackbar;
