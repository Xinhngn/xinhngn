// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Đổi thành tên miền thật khi có.
  site: 'https://xinhngn.workers.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always', format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  compressHTML: true,
});
