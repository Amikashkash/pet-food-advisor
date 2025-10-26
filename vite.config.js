// Vite configuration file for Food Advisor App
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React plugin for Fast Refresh and JSX support
    react(),

    // PWA plugin for Progressive Web App functionality
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'assets/**/*'],
      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        name: 'Food Advisor - Pet Food Recommendations',
        short_name: 'Food Advisor',
        description: 'Interactive pet food advisor for Nutram, Brit Care, and Carnilove products',
        theme_color: '#8b5cf6',
        background_color: '#0f0f0f',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'he',
        dir: 'rtl',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['lifestyle', 'shopping'],
        screenshots: []
      },
      workbox: {
        // Cache all static assets
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,json}'],
        // Runtime caching for external resources
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/assets',
      '@components': '/src/components',
      '@context': '/src/context',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@styles': '/src/styles'
    }
  },
  // Server configuration for development
  server: {
    port: 5173,
    host: true
  },
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})
