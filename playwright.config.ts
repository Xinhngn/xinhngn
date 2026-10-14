import { defineConfig, devices } from '@playwright/test';

// Runs against the production build (vite build + vite preview), on a desktop and a phone size.
const PORT = 5175;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  // PW_CHROMIUM: path to a pre-installed Chromium when the bundled one is missing (e.g. cloud sessions).
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure', launchOptions: { executablePath: process.env.PW_CHROMIUM || undefined } },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 860 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
