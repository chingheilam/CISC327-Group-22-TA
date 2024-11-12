import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // 使用 V8 引擎进行覆盖率分析
      reporter: ['text', 'html'], // 指定输出格式，可以是 'text', 'html', 'json-summary', 等
      reportsDirectory: './coverage', // 指定覆盖率报告存储位置
      include: ['src/views/*.vue', 'src/tests/*.spec.js'], // 指定要分析覆盖率的文件路径
      exclude: ['**/node_modules/**', '**/tests/**'], // 排除特定文件或文件夹
    },
  },
})
