
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
   // host: "::",
   // port: 8080,
   // Loại bỏ cấu hình proxy vì chúng ta gọi API trực tiếp
   proxy: {
    '/deployment/api': {
      target: 'http://frontend.unstract.localhost:90',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/deployment\/api/, '/deployment/api')
    }
  } 
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
