import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/adarna/ibong-adarna-hero.png', 'images/adarna p2/*.png'],
      manifest: {
        name: 'Adarna Quest',
        short_name: 'Adarna Quest',
        description: 'Interactive Ibong Adarna puzzle experience.',
        theme_color: '#1a0a2e',
        background_color: '#0a0015',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/images/adarna/ibong-adarna-hero.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
})
