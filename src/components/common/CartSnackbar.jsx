import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useCart } from "../../context/CartContext";

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

export default CartSnackbar;
