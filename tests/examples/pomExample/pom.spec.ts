import { test } from '@playwright/test'
import { AuthFactory } from '../../../src/authProvider/factory/authFactory'

test('Pom test', async ({ page }) => {
  await AuthFactory.createSuperfixAuth(page).authenticate()
})
