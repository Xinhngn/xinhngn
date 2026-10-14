import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// One self-contained index.html (CSS + JS inlined) in dist-artifact/, for republishing
// the claude.ai artifact version of the site. Images and the CV stay in public/assets/
// and are published next to it.
export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [viteSingleFile()],
  build: { outDir: 'dist-artifact', emptyOutDir: true, target: 'es2020' },
});
