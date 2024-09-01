import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// Alias Resolve
import tsconfigPaths from 'vite-tsconfig-paths';
// ES Lint Plugin
import wyw from '@wyw-in-js/vite';
// Visible Chunk Size
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
  },
  build: {
    minify: 'terser',
    chunkSizeWarningLimit: 600, // NOTE: refractor 594kB
    terserOptions: {
      compress: {
        passes: 3, // Compress 3times
      },
    },
    rollupOptions: {
      output: {
        //Split Chunk
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react', '@linaria/babel-preset'],
      },
    }),
  ],
  envDir: './env',
});
