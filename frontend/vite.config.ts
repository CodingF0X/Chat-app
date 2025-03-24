import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // Optionally, rewrite the URL path if needed:
        rewrite: (path) => path.replace(/^\/graphql/, "/graphql"),
      },
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
