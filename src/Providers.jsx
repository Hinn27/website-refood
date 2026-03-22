import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { MealsProvider } from "./context/MealsContext.jsx";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MealsProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </MealsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

