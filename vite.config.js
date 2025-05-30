import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist'
  },
  server: {
    open: true,
    port: 5173,
    // Fix 404 on reload
    historyApiFallback: true
  }
})
