import { BrowserContext, Page, test as base } from '@playwright/test'
import { PropertiesManager } from '../utils/propertiesManager/propertiesManager.js'

type MyFixtures = {
  context: BrowserContext
  page: Page
}

export const test = base.extend<MyFixtures>({
  context: async ({ browser }, use) => {
    const proxyUrl = PropertiesManager.getProperty('TEST_PROXY_SERVER')
    const username = PropertiesManager.getProperty('TEST_PROXY_USERNAME')
    const password = PropertiesManager.getProperty('TEST_PROXY_USERNAME')
    const context: BrowserContext = await browser.newContext({
      proxy: {
        server: proxyUrl,
        username: username,
        password: password,
      },
    })
    use(context)
  },

  page: async ({ context }, use) => {
    use(await context.newPage())
  },
})
