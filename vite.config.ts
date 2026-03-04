import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    nitro(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      sitemap: {
        enabled: true,
        host: (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://synerthink.com').replace(/\/+$/, ''),
        outputPath: 'sitemap.xml',
      },
      pages: [
        { path: '/' },
        { path: '/about' },
        { path: '/solutions' },
        { path: '/resources' },
        { path: '/products' },
        { path: '/products/dotlanth' },
        { path: '/blog' },
        { path: '/blog/dotlanth-v26-1-0-alpha' },
      ],
    }),
    react(),
  ],
})
