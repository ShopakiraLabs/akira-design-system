import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// In the published repo these imports resolve via the github:... install
// to /src/tokens/*.css. Inside this demo, the vite alias does the same.
import "@akira/design-system/src/tokens/tokens.css";
import "@akira/design-system/src/tokens/components.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
