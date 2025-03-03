import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    envCompatible(),
  ],
  server: {
    host: true,
    hmr: process.env.PROJECT_STATUS === 'DEV' ? {
      path: "/hmr",
      port: 7002,
    } : false,
    watch: { usePolling: true },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
