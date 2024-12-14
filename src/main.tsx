import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TotalProvider } from "./Contexts/TotalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TotalProvider>
        <App />
      </TotalProvider>
    </BrowserRouter>
  </StrictMode>
);
