import { defineConfig, devices } from "@playwright/test";

// Run against an already-started Pages preview; no hidden server startup.
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: process.env.QA_BASE_URL || "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "mobile-320", use: { viewport: { width: 320, height: 740 } } },
    {
      name: "mobile-390",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    { name: "desktop-1440", use: { viewport: { width: 1440, height: 1000 } } },
  ],
});
