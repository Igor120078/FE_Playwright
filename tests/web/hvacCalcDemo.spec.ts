/* eslint-disable import/order */
import { test } from '@playwright/test'
import { CookiesBarPOM } from '../../src/poms/web/cookiesBar/cookiesBarPOM'
import { HomePagePOM } from '../../src/poms/web/homePage/homePagePOM'
import { HvacCalcStartPOM } from '../../src/poms/web/waHvac/hvacCalcStartPOM'
import { HvacCalcStep1POM } from '../../src/poms/web/waHvac/hvacCalcStep1POM'
import { HvacCalcStep2POM } from '../../src/poms/web/waHvac/hvacCalcStep2POM'
import { HvacCalcStep3POM } from '../../src/poms/web/waHvac/hvacCalcStep3POM'
import { HvacCalcStep4POM } from '../../src/poms/web/waHvac/hvacCalcStep4POM'
import { HvacCalcStep5POM } from '../../src/poms/web/waHvac/hvacCalcStep5POM'
import { HvacCalcStep5aPOM } from '../../src/poms/web/waHvac/hvacCalcStep5aPOM'
import { HvacCalcStep5bPOM } from '../../src/poms/web/waHvac/hvacCalcStep5bPOM'
import { HvacCalcStep6POM } from '../../src/poms/web/waHvac/hvacCalcStep6POM'
import { HvacCalcStep8POM } from '../../src/poms/web/waHvac/hvacCalcStep8POM'
import { OfferPageTitlePOM } from '../../src/poms/web/waHvac/offerPageTitlePOM'
import { OfferPageWhatNextPOM } from '../../src/poms/web/waHvac/offerPageWhatNextPOM'
import { OfferPageWhyWoltairPOM } from '../../src/poms/web/waHvac/offerPageWhyWoltairPOM'
import { OfferPageModelsTabsWithIdPOM } from '../../src/poms/web/waHvac/offerPageModelsTabsWithIdPOM'

import { HeatSources } from '../../src/poms/web/waHvac/enums/heatSourceEnum'
import { WaterHeating } from '../../src/poms/web/waHvac/enums/waterHeatingEnum'
import { IsoLevels } from '../../src/poms/web/waHvac/enums/isoLevelsEnum'
import { TestDataObjects } from './testDataObjects'

test.afterEach(async ({ page }) => {
  page.close()
})

test('Heat Pump Calculator test @daily', async ({ page }) => {
  test.setTimeout(80000)
  //   page.setViewportSize({ width: 1920, height: 1080 })

  // test data
  const testDataObjects = new TestDataObjects()
  const testData = testDataObjects.getTestData()

  // Go to WoltAir main page
  const cookiesBar = new CookiesBarPOM(page)
  const homePage = new HomePagePOM(page)
  await homePage.navigate()

  await cookiesBar.validateAllComponents()
  await cookiesBar.acceptAllCookies()

  await homePage.makeAllTranslationsKeysVisible()
  await homePage.validateAllComponents()
  await homePage.startCalculator()

  // Calculator router page
  const calcStartPage = new HvacCalcStartPOM(page)
  await calcStartPage.validateAllComponents()
  await calcStartPage.selectHvac()

  // Calculator steps
  const step1 = new HvacCalcStep1POM(page)
  await step1.validateAllComponents()
  await step1.selectHeatSource(HeatSources.GAS)

  const step2 = new HvacCalcStep2POM(page)
  await step2.validateAllComponents()
  await step2.selectWaterHeatingSource(WaterHeating.ELECTRO)

  const step3 = new HvacCalcStep3POM(page)
  await step3.validateAllComponents()
  await step3.selectPeopleCount()

  const step4 = new HvacCalcStep4POM(page)
  await step4.validateAllComponents()
  await step4.fillFloorSquare(testData!.floorSquare)
  await step4.submitFloorSquare()

  const step5 = new HvacCalcStep5POM(page)
  await step5.validateAllComponents()

  const knowHeatLoss = testData!.knowHeatLoss

  if (knowHeatLoss) {
    await step5.selectYes()
    const step5a = new HvacCalcStep5aPOM(page)
    await step5a.validateAllComponents()
    await step5a.fillHeatLoss(testData!.heatLoss)
    await step5a.submitHeatLoss()
  } else {
    await step5.selectNo()
    const step5b = new HvacCalcStep5bPOM(page)
    await step5b.validateAllComponents()
    await step5b.selectIsoLevel(IsoLevels.HIGH)
  }

  const step6 = new HvacCalcStep6POM(page)
  await step6.validateAllComponents()
  await step6.selectYes()

  const step7 = await step6.selectStep7Variant()
  await step7.setLocation({ region: testData!.regionName, zipCode: testData!.zipCode })

  const step8 = new HvacCalcStep8POM(page)
  await step8.validateAllComponents()
  await step8.fillEmailInput(testData!.email)
  await step8.fillPhoneInput(testData!.phoneNumber)
  await step8.submitForm()

  const offerTitle = new OfferPageTitlePOM(page)
  await offerTitle.waitForOfferPage()
  await offerTitle.validateAllComponents()

  const modelsTabs = new OfferPageModelsTabsWithIdPOM(page)
  await modelsTabs.setExpectedFloorSquare(testData!.floorSquare)
  await modelsTabs.validateAllComponents()
  await modelsTabs.checkModelsTabsContent()

  const whatNext = new OfferPageWhatNextPOM(page)
  await whatNext.validateAllComponents()
  await whatNext.checkLastMontagesCount()

  const whyWoltair = new OfferPageWhyWoltairPOM(page)
  await whyWoltair.validateAllComponents()
})
