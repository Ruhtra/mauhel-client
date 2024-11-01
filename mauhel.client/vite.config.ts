import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*']
    },
    devOptions: {
      enabled: true
    },
    includeAssets: ['**/*'],
    manifest: {
      name: 'Mauhel App',
      short_name: 'MauhelApp',
      description: 'The Mauhel App is designed to assist students at the Mauhel preparatory course in solving problems and enhancing their learning experience. With a user-friendly interface and a range of resources, this app aims to support students in their studies and improve their academic performance.',
      theme_color: '#ffffff',
      background_color: '#033952',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      orientation: 'portrait',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }),
  ,],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
