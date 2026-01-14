import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/undertale-representation/', // ← THIS IS THE FIX
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
