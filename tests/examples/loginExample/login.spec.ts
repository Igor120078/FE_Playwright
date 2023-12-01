import { test } from '@playwright/test'
import { AuthFactory } from '../../../src/authProvider/factory/authFactory'
import { SuperfixWebAuthIdentifierOptions } from '../../../src/authProvider/types/superfixWebAuthOptions'

test('Example of authorization usage in superfix', async ({ page }) => {
  await AuthFactory.createSuperfixWebAuth(page)
    .setIdentifierOption(SuperfixWebAuthIdentifierOptions.EMAIL)
    .setUserIdentifier('pavel.matuska@woltair.cz')
    .authenticate()
})

test('Example of authorization usage in warehouse', async ({ page }) => {
  await AuthFactory.createWarehouseWebAuth(page).setUserIdentifier('devs@whouse.cz').authenticate()
})

test('Example of Superfix auth using env properties', async ({ page }) => {
  await AuthFactory.createSuperfixAuth(page).authenticate()
})

test('Example of Warehouse auth using env properties', async ({ page }) => {
  await AuthFactory.createWarehouseAuth(page).authenticate()
})
