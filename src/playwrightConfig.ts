import type { PlaywrightTestConfig } from '@playwright/test'

type getPlaywrightConfigType = {
  testDir: './tests' | './src' | './src/routes' | './tests/e2e' | './tests/unit'
  baseURL: string
  webServerEnable?: boolean
  globalSetup?: string
  customConfig?: PlaywrightTestConfig
}

export const getPlaywrightConfig = ({
  testDir = './tests',
  baseURL,
  webServerEnable = true,
  globalSetup,
  customConfig = {},
}: getPlaywrightConfigType): PlaywrightTestConfig => {
  const config: PlaywrightTestConfig = {
    webServer: webServerEnable
      ? {
          command: 'npm run build && npm run preview',
          port: 4001,
        }
      : undefined,
    testDir: testDir,
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    testIgnore: /\.unit\./,
    outputDir: 'test-results/',
    globalSetup: globalSetup,
    timeout: 120 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    expect: {
      timeout: 5000,
    },
    reporter: [
      ['html', { outputFolder: 'playwright-report', open: process.env.CI ? 'never' : 'always' }],
      ['json', { outputFile: 'playwright-report.json' }],
    ],
    retries: 2,
    workers: 1,
    use: {
      baseURL: baseURL,
      viewport: null,
      browserName: 'chromium',
      colorScheme: 'dark',
      headless: !!process.env.CI,
      extraHTTPHeaders: { 'X-wa-app': 'woltair' },
      launchOptions: {
        args: ['--start-maximized'],
      },

      // Recording Options
      trace: 'on',
      screenshot: 'on',
      video: 'retain-on-failure',

      // Other Options
      actionTimeout: 6000,
      userAgent: 'some custom ua',
    },
  }

  return { ...config, ...customConfig }
}
