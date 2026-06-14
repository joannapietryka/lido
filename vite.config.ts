import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const configYmlPath = path.resolve(__dirname, 'config.yml')

function decapCmsDevPlugin(): Plugin {
  return {
    name: 'decap-cms-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? ''

        if (pathname === '/config.yml') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/yaml; charset=utf-8')
          res.end(fs.readFileSync(configYmlPath, 'utf-8'))
          return
        }

        if (pathname === '/admin' || pathname === '/admin/') {
          const adminHtml = path.join(server.config.publicDir, 'admin/index.html')
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(fs.readFileSync(adminHtml, 'utf-8'))
          return
        }

        next()
      })
    },
    closeBundle() {
      fs.copyFileSync(configYmlPath, path.resolve(__dirname, 'dist/config.yml'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [decapCmsDevPlugin(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor'
          }
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) return 'i18n'
        },
      },
    },
  },
})
