import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

// ============================================================
// ENTRY POINT
// ============================================================
// 1. global.css import → saara theme, animations yahan se load
// 2. BrowserRouter → React Router ko wrap karta hai (routes kaam karein)
// 3. App → root component (jo AppRoutes render karega)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);