import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"), // This sets '~' to point to the 'src' directory
    },
  },
  // server: {
  //   host: "0.0.0.0",
  //   port: 5173,
  // },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // T?t sourcemap d? gi?m kích thu?c file
    target: 'esnext',
    minify: false, // S? d?ng minifier t?i uu
    chunkSizeWarningLimit: 2000, // Tang gi?i h?n c?nh báo kích thu?c chunk
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'PLUGIN_WARNING' && /PURE/.test(warning.message)) return;
        warn(warning);
      },
    },
  },
});
