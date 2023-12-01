import { test } from '@playwright/test'
import ListOfUsersPOM from '../../../src/poms/superfix/userPOM'
import { AuthFactory } from '../../../src/authProvider/factory/authFactory'
import { DataProviderInterface } from '../../../src/dataProvider/interfaces/dataProviderInterface'
import { DataProviderFactory } from '../../../src/dataProvider/factory/dataProviderFactory'
import data from './testData.json' assert { type: 'json' }

test('List of Users', async ({ page }) => {
  const listOfUsersPOM = new ListOfUsersPOM(page)

  interface TestDataDefinition {
    loginEmail: string
    tagName: string
  }

  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.randomDataReader()
  testData.load(data)
  testData.getNext()
  await AuthFactory.createSuperfixAuth(page).authenticate()
  await page.locator("//*[@href='/users']").waitFor({ timeout: 10000 })
  await page.locator("//*[@href='/users']").click()
  await listOfUsersPOM.validateAllComponents()
})
