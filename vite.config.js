import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // <-- Đổi số 3000 thành số nào Ngân thích (3001, 3002, 8080...)
  },
})