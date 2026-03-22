import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Providers from "./Providers.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>
);
