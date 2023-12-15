import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tsConfigPaths(), svgrPlugin()],
  build: {
    rollupOptions: {
      external: ["styled-components"],
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
}));
