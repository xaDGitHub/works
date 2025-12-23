import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === 'production' ? '/works/' : '/', // 本地('/')，生产('/works/')
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
}));