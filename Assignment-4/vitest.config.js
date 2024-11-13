// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    istanbul({
      // These options configure code coverage instrumentation
      include: ['src/**/*.vue', 'src/**/*.js'], // Include your source files for coverage
      exclude: ['node_modules', 'tests/'],      // Exclude node_modules and test files
      extension: ['.js', '.ts', '.vue'],        // File extensions to include
      cypress: false,
      requireEnv: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Configure the '@' alias
    },
  },
  test: {
    include: ['src/tests/*.js'], // Include only test scripts in src/tests/*.js
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',       // Use Istanbul for coverage
      reporter: ['text', 'html'], // Output formats
    },
  },
})
