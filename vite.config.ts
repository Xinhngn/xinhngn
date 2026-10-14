/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

// The page loads images and the CV from public/assets/ by relative path ('assets/...'),
// so Vite's own hashed bundles go to static/ to keep the two apart.
export default defineConfig({
  base: './',
  server: { port: 5173, strictPort: true },
  preview: { port: 5175, strictPort: true },
  build: { assetsDir: 'static', target: 'es2020' },
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts'],
  },
});
