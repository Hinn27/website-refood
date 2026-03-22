import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import CartSnackbar from "./components/common/CartSnackbar";
import MobileSpeedDial from "./components/common/MobileSpeedDial";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./AppRoutes";

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
