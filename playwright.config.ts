import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { defineConfig, devices } from '@playwright/test';

if (existsSync('.env')) loadEnvFile('.env');
for (const name of ['SILVER_PATIENT_EMAIL', 'SILVER_PATIENT_PASSWORD']) {
  if (!process.env[name]?.trim()) throw new Error(`${name} must be set in .env.`);
}

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
  // Authenticate once before any dependent browser tests.
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts$/,
      retries: 0,
      use: { ...devices['Desktop Chrome'], trace: 'off', screenshot: 'off', video: 'off' },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts$/,
      use: { ...devices['Desktop Chrome'], storageState: '.auth/silver-patient.json' },
    },
  ],
});
