/// <reference types="vitest" />

import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import VitePluginPrefetchModule from 'vite-plugin-prefetch-module';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [react(), VitePluginPrefetchModule({ concurrent: 3 })],
  build: {
    target: 'ESNext',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/'],
    },
  },
});
