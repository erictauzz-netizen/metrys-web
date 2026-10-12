import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    strictPort: true,
    proxy: {
      '/api/lead': {
        target: 'http://localhost:3006',
        changeOrigin: true,
        rewrite: () => '/api/v1/webhooks/in/metrys-site-institucional-oficial',
      },
    },
  },
})
