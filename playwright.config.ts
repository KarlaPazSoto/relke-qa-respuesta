import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    baseURL: 'https://demo.relbase.cl',
    ignoreHTTPSErrors: true,
  },
  // testDir: './tests',
  timeout: 30000,
  
});
