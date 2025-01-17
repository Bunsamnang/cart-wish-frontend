import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { OpenModalProvider } from "./Contexts/OpenModalContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <OpenModalProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </OpenModalProvider>
    </BrowserRouter>
  </StrictMode>
);
