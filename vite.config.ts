import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function vercelCleanUrlsPreview(): Plugin {
  return {
    name: 'vercel-clean-urls-preview',
    configurePreviewServer(server) {
      const distDir = path.resolve(rootDir, 'dist');
      server.middlewares.use((req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) return next();
        const urlPath = req.url.split('?')[0].split('#')[0];
        if (urlPath === '/' || path.extname(urlPath)) return next();

        const rel = urlPath.replace(/^\/+|\/+$/g, '');
        const cleanHtml = path.join(distDir, `${rel}.html`);
        const dirIndex = path.join(distDir, rel, 'index.html');
        const target = fs.existsSync(cleanHtml)
          ? cleanHtml
          : fs.existsSync(dirIndex)
            ? dirIndex
            : null;

        if (target) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(target));
          return;
        }

        const notFoundHtml = path.join(distDir, '404.html');
        if (fs.existsSync(notFoundHtml)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(notFoundHtml));
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), vercelCleanUrlsPreview()],
  ...(isSsrBuild
    ? {}
    : {
        build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules/framer-motion')) return 'motion';
                if (id.includes('node_modules/lucide-react')) return 'icons';
                return undefined;
              },
            },
          },
        },
      }),
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
}))
