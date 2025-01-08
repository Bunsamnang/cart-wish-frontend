import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { OpenModalProvider } from "./Contexts/OpenModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <OpenModalProvider>
        <App />
      </OpenModalProvider>
    </BrowserRouter>
  </StrictMode>
);
