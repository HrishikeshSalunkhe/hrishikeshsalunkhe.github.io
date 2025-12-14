import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        // When GitHub Pages can't find a file, it serves 404.html
        // This allows React Router to handle all routes client-side
        const distPath = join(__dirname, 'dist')
        copyFileSync(
          join(distPath, 'index.html'),
          join(distPath, '404.html')
        )
      }
    }
  ],
  base: '/',
})
