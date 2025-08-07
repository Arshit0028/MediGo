import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update 'base' if you're deploying to GitHub Pages (e.g. /your-repo-name/)
export default defineConfig({
  base: '/MediGo',
  plugins: [react()],
  server: { port: 5173 }
})
