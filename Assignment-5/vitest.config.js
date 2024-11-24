// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), istanbul()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/views/*.vue'],
      exclude: [
        '**/node_modules/**',
        '**/Register.vue',
        '**/FlightRescheduleUpgrade.vue',
        '**/FlightsCancellation.vue',
        '**/OrderHistory.vue',
      ],
      cypress: false,
      requireEnv: false,
    },
  },
})
