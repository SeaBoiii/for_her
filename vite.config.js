import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base so the app works on GitHub Pages project sites,
// Vercel, and Netlify without extra configuration.
export default defineConfig({
  base: './',
  plugins: [react()],
})
