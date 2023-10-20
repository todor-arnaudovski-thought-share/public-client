import React from "react";
import ReactDOM from "react-dom/client";
import AppWithUserProvider from "./AppWithUserProvider";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWithUserProvider />
  </React.StrictMode>
);
