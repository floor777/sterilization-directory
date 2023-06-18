import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    protocol: 'ws',
    host: true,
    strictPort: true,
    port: 5173
  }
})
