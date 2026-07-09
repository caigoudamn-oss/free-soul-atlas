import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      scheduler: new URL('./src/lib/schedulerShim.js', import.meta.url).pathname,
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  server: {
    host: '127.0.0.1',
  },
})
