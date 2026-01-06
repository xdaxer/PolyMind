import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { PolyMindProvider } from "./context/context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PolyMindProvider>
      <App />
    </PolyMindProvider>
  </BrowserRouter>
);