
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import historyFallbackPlugin from './vite-history-fallback-plugin.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    historyFallbackPlugin() // Add our custom history fallback plugin
  ],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
