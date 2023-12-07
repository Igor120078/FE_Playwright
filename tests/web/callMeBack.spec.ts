/* eslint-disable import/order */
import { test, type Page } from '@playwright/test'
import { CookiesBarPOM } from '../../src/poms/web/cookiesBar/cookiesBarPOM'
import { HomePagePOM } from '../../src/poms/web/homePage/homePagePOM'
import { CallMeBackStep1POM } from '../../src/poms/web/callMeBack/callMeBackStep1POM'
import { CallMeBackStep2POM } from '../../src/poms/web/callMeBack/callMeBackStep2POM'
import { CallMeBackStep3POM } from '../../src/poms/web/callMeBack/callMeBackStep3POM'
import type { DataProviderInterface } from '../../src/dataProvider/interfaces/dataProviderInterface'
import { DataProviderFactory } from '../../src/dataProvider/factory/dataProviderFactory'
import data from './testDataWeb'

test.afterEach(async ({ page }) => {
  page.close()
})

test.describe('Call Me Back Test @daily', () => {
  test('CallMeBack Hvac Test', async ({ page }) => {
    await callMeBackTest(page, 'hvac')
  })
  test('CallMeBack Fve Test', async ({ page }) => {
    await callMeBackTest(page, 'fve')
  })
})

async function callMeBackTest(page: Page, product: string) {
  interface TestDataDefinition {
    fullName: string
    phoneNumber: string
    zipCode: string
    email: string
    floorSquare: string
    heatLoss: string
    consumption: string
  }
  const testDataAll: DataProviderInterface<TestDataDefinition> =
    DataProviderFactory.randomDataReader<TestDataDefinition>()
  testDataAll.load(data)
  const testData = testDataAll.getNext()

  // Go to WoltAir main page
  const homePage = new HomePagePOM(page)
  const cookiesBar = new CookiesBarPOM(page)
  await homePage.navigate()

  await cookiesBar.validateAllComponents()
  await cookiesBar.acceptAllCookies()

  await homePage.makeAllTranslationsKeysVisible()
  await homePage.validateAllComponents()
  await homePage.startCallMeForm()

  // Personal callMe Steps
  const callMeStep1 = new CallMeBackStep1POM(page)
  const callMeStep2 = new CallMeBackStep2POM(page)
  const callMeStep3 = new CallMeBackStep3POM(page)

  await callMeStep1.validateAllComponents()

  if (product == 'hvac') {
    await callMeStep1.selectHvac()
  } else {
    await callMeStep1.selectFve()
  }

  await callMeStep2.validateAllComponents()
  await callMeStep2.fillName(testData!.fullName)
  await callMeStep2.fillPhone(testData!.phoneNumber)
  await callMeStep2.fillZipcode(testData!.zipCode)
  await callMeStep2.submitForm()
  await callMeStep3.validateAllComponents()
}
