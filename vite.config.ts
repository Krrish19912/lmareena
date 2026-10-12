import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/three/') || id.includes('/three-')) return 'three';
          if (id.includes('@react-three')) return 'r3f';
          if (id.includes('/motion/') || id.includes('/framer-motion/')) return 'motion';
          return undefined;
        },
      },
    },
  },
});
