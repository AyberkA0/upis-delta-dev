import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// https://rsbuild.dev/guide/basic/configure-rsbuild
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    favicon: "src/assets/favicon.ico",
    title: "Delta | upisdelta.com ",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5120",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
