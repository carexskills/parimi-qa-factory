import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Run the repository's Playwright tests from the tests directory.
  testDir: './tests',
  // Use zero retries locally and at most one retry when CI is set.
  retries: process.env.CI ? 1 : 0,
  // Show the test list in the terminal and write an HTML report under reports/.
  reporter: [['list'], ['html', { outputFolder: 'reports', open: 'never' }]],
  use: {
    // Read the application URL from BASE_URL, defaulting to the local app.
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:8096',
    // Run headed only when HEADED=1; otherwise run headless.
    headless: process.env.HEADED !== '1',
    // Keep a trace only for failed tests.
    trace: 'retain-on-failure',
    // Keep a screenshot only for failed tests.
    screenshot: 'only-on-failure',
    // Keep a video only for failed tests.
    video: 'retain-on-failure',
  },
  // Run exactly one browser project: Chromium.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
