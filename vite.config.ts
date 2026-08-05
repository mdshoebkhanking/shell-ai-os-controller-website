import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/shell-ai-os-controller-website/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022'
  }
})
