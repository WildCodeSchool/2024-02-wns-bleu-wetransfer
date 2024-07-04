import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['@emotion/babel-plugin']
            }
        }),
        envCompatible()
    ],
  server: {
    host: true,
    hmr: {
      path: "/hmr",
      port: 5174,
    },
  },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
});
