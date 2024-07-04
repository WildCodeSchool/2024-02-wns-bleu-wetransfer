import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [
    react(),
    envCompatible()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom'
    ],
  },
  build: {
    rollupOptions: {
      input: './index.html', 
    }
  }
});
