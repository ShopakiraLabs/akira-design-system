import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Vite config for the in-repo demo. The demo lives at /examples/basic and
// imports from ../../src directly — no published package needed.
export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  server: { port: 5173, host: "127.0.0.1" },
  // Alias points at the repo root so paths like
  //   import '@akira/design-system/src/tokens/tokens.css'
  //   import { AppShell } from '@akira/design-system'
  // resolve identically inside the demo and in real consumer projects (where
  // npm installs the same repo to node_modules/@akira/design-system).
  resolve: {
    alias: [
      {
        find: /^@akira\/design-system$/,
        replacement: path.resolve(__dirname, "../../src/index.ts"),
      },
      {
        find: /^@akira\/design-system\/(.*)$/,
        replacement: path.resolve(__dirname, "../../") + "/$1",
      },
    ],
  },
});
