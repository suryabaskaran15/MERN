import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: "../.env" });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: Number(process.env.VITE_CLIENT_PORT),
    host: '0.0.0.0'
  },
  preview: {
    port: Number(process.env.VITE_CLIENT_PORT),
  },
  envDir: "../.env",
})
