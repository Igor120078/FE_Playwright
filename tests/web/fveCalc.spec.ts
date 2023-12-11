/* eslint-disable import/order */
import { test } from '@playwright/test'
import { CookiesBarPOM } from '../../src/poms/web/cookiesBar/cookiesBarPOM'
import { HomePagePOM } from '../../src/poms/web/homePage/homePagePOM'
import { FveCalcStartPOM } from '../../src/poms/web/waFve/fveCalcStartPOM'
import { FveCalcStep1POM } from '../../src/poms/web/waFve/fveCalcStep1POM'
import { FveCalcStep2aPOM } from '../../src/poms/web/waFve/fveCalcStep2aPOM'
import { FveCalcStep2bPOM } from '../../src/poms/web/waFve/fveCalcStep2bPOM'
import { FveCalcStep2cPOM } from '../../src/poms/web/waFve/fveCalcStep2cPOM'
import { FveCalcStep3POM } from '../../src/poms/web/waFve/fveCalcStep3POM'
import { FveCalcStep4aPOM } from '../../src/poms/web/waFve/fveCalcStep4aPOM'
import { FveCalcStep4bPOM } from '../../src/poms/web/waFve/fveCalcStep4bPOM'
import { FveCalcStep5POM } from '../../src/poms/web/waFve/fveCalcStep5POM'
import { FveCalcStep6POM } from '../../src/poms/web/waFve/fveCalcStep6POM'
import { FveCalcStep7aPOM } from '../../src/poms/web/waFve/fveCalcStep7aPOM'
import { FveCalcStep7bPOM } from '../../src/poms/web/waFve/fveCalcStep7bPOM'
import { OfferPageFveParametersPOM } from '../../src/poms/web/waFve/offerPageFveParametersPOM'
import { OfferPageSelfServicePOM } from '../../src/poms/web/waFve/offerPageSelfServicePOM'
import { OfferPagePricesPOM } from '../../src/poms/web/waFve/offerPagePricesPOM'
import { OfferPageWhatNextPOM } from '../../src/poms/web/waFve/offerPageWhatNextPOM'
import { OfferPageFveComponentsPOM } from '../../src/poms/web/waFve/offerPageFveComponentsPOM'
import { OfferPageSeasonCoveragePOM } from '../../src/poms/web/waFve/offerPageSeasonCoveragePOM'
import { OfferPageMonthlyConsumptionPOM } from '../../src/poms/web/waFve/offerPageMonthlyConsumptionPOM'
import { OfferPageEnergyProductionPOM } from '../../src/poms/web/waFve/offerPageEnergyProductionPOM'
import { OfferPageYearlySavingsPOM } from '../../src/poms/web/waFve/offerPageYearlySavingsPOM'
import { OfferPageFutureEnergyPaymentsPOM } from '../../src/poms/web/waFve/offerPageFutureEnergyPaymentsPOM'
import { OfferPageRealizationsAndFaqPOM } from '../../src/poms/web/waFve/offerPageRealizationsAndFaqPOM'
import { OfferPageWhyWoltairPOM } from '../../src/poms/web/waFve/offerPageWhyWoltairPOM'
import { OfferPageHowManyVariantsPOM } from '../../src/poms/web/waFve/offerPageHowManyVariantsPOM'
import { OfferPageSeasonCoverageOptimumPOM } from '../../src/poms/web/waFve/offerPageSeasonCoverageOptimumPOM'
import { OfferPageMonthlyConsumptionOptimumPOM } from '../../src/poms/web/waFve/offerPageMonthlyConsumptionOptimumPOM'
import { OfferPageYearlySavingsOptimumPOM } from '../../src/poms/web/waFve/offerPageYearlySavingsOptimumPOM'
import { OfferPageFutureEnergyPaymentsOptimumPOM } from '../../src/poms/web/waFve/offerPageFutureEnergyPaymentsOptimumPOM'
import type { ButtonInterface } from '../../src/components/interfaces/buttonInterface'
import type { DataProviderInterface } from '../../src/dataProvider/interfaces/dataProviderInterface'
import { DataProviderFactory } from '../../src/dataProvider/factory/dataProviderFactory'
import data from './testDataWeb'

test.afterEach(async ({ page }) => {
  page.close()
})

test('Photovoltaic Calculator test @daily', async ({ page }) => {
  test.setTimeout(80000)

  // test data
  interface TestDataDefinition {
    fullName: string
    phoneNumber: string
    zipCode: string
    email: string
    floorSquare: string
    heatLoss: string
    consumption: string
    regionName: string
    knowConsumption: boolean
  }
  const testDataAll: DataProviderInterface<TestDataDefinition> =
    DataProviderFactory.randomDataReader<TestDataDefinition>(data)
  // testDataAll.load(data)
  const testData = testDataAll.getNext()

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
  const calcStartPage = new FveCalcStartPOM(page)
  await calcStartPage.validateAllComponents()
  await calcStartPage.selectFve()

  // Calculator steps
  const step1 = new FveCalcStep1POM(page)
  await step1.validateAllComponents()

  const knowConsumption = testData!.knowConsumption
  if (knowConsumption) {
    await step1.selectKnowConsumption()
    const step2a = new FveCalcStep2aPOM(page)
    await step2a.validateAllComponents()
    await step2a.fillConsumptionInput(testData!.floorSquare)
    await step2a.submitConsumption()
  } else {
    await step1.selectKnowFloorSquare()

    const step2b = new FveCalcStep2bPOM(page)
    await step2b.validateAllComponents()
    await step2b.fillFloorSquareInput(testData!.floorSquare)
    await step2b.submitFloorSquare()

    const step2c = new FveCalcStep2cPOM(page)
    await step2c.validateAllComponents()
    await step2c.selectIsoLevelHigh()
  }

  const step3 = new FveCalcStep3POM(page)
  await step3.validateAllComponents()
  await step3.selectHeatTypeOther()

  const step4a = new FveCalcStep4aPOM(page)
  await step4a.validateAllComponents()
  await step4a.selectElectricBoiler()

  if (!knowConsumption) {
    const step4b = new FveCalcStep4bPOM(page)
    await step4b.validateAllComponents()
    await step4b.selectPeopleCount()
  }

  const step5 = new FveCalcStep5POM(page)
  await step5.validateAllComponents()
  await step5.selectYes()

  const step6 = new FveCalcStep6POM(page)
  await step6.validateAllComponents()
  await step6.fillZipCodeInput(testData!.zipCode)
  await step6.submitZipCode()

  const step7a = new FveCalcStep7aPOM(page)
  const step7b = new FveCalcStep7bPOM(page)

  if (await step7a.checkIfVariantWithShowValues()) {
    await step7a.validateAllComponents()
    await step7a.clickShowValues()
    await step7a.validateAllComponents()
    await step7a.fillEmailInput(testData!.email)
    await step7a.fillPhoneInput(testData!.phoneNumber)
    await step7a.clickShowCalculationResults()
  } else {
    await step7b.validateAllComponents()
    await step7b.fillEmailInput(testData!.email)
    await step7b.fillPhoneInput(testData!.phoneNumber)
    await step7b.submitForm()
  }

  const variants = new OfferPageHowManyVariantsPOM(page)
  await variants.waitForOfferPage()

  const fveParameters = new OfferPageFveParametersPOM(page)
  await fveParameters.validateAllComponents()

  const offerPrices = new OfferPagePricesPOM(page)
  await offerPrices.validateAllComponents()

  const whatNext = new OfferPageWhatNextPOM(page)
  await whatNext.validateAllComponents()

  const fveComponents = new OfferPageFveComponentsPOM(page)
  await fveComponents.validateAllComponents()

  const selfService = new OfferPageSelfServicePOM(page)
  await selfService.validateAllComponents()

  const energyProduction = new OfferPageEnergyProductionPOM(page)
  await energyProduction.validateAllComponents()

  if (await variants.checkIfOnlyOptimumVariantIsOffered()) {
    console.log('There is only Optimum variant on the Offer Page')

    await fveParameters.validatePhotovoltaicParameters()
    await offerPrices.validateOfferPrices()

    const seasonCoverage = new OfferPageSeasonCoverageOptimumPOM(page)
    await seasonCoverage.validateAllComponents()
    await seasonCoverage.validateSeasonCoverageValues()

    const monthlyConsumption = new OfferPageMonthlyConsumptionOptimumPOM(page)
    await monthlyConsumption.validateAllComponents()

    const yearlySavings = new OfferPageYearlySavingsOptimumPOM(page)
    await yearlySavings.validateAllComponents()
    await yearlySavings.validateYearlySavingsValues()

    const futurePayments = new OfferPageFutureEnergyPaymentsOptimumPOM(page)
    await futurePayments.validateAllComponents()
    await futurePayments.validateFutureEnergyPaymentsTableYearsCountEqual7()
  } else {
    console.log('There are Optimum and Sufficiency variants on the Offer Page')

    const dynamicVariants: ButtonInterface[] = await variants.getOfferVariants()

    for (let i = 0; i < dynamicVariants.length; i++) {
      await dynamicVariants[i].click()
      console.log(`Variant ${await variants.getVariantName(i)}:`)

      await fveParameters.validatePhotovoltaicParameters()
      await offerPrices.validateOfferPrices()

      const seasonCoverage = new OfferPageSeasonCoveragePOM(page)
      await seasonCoverage.validateAllComponents()
      await seasonCoverage.validateSeasonCoverageValues()

      const monthlyConsumption = new OfferPageMonthlyConsumptionPOM(page)
      await monthlyConsumption.validateAllComponents()

      const yearlySavings = new OfferPageYearlySavingsPOM(page)
      await yearlySavings.validateAllComponents()
      await yearlySavings.validateYearlySavingsValues()

      const futurePayments = new OfferPageFutureEnergyPaymentsPOM(page)
      await futurePayments.validateAllComponents()
      await futurePayments.validateFutureEnergyPaymentsTableYearsCountEqual7()
    }
  }

  const realizationAndFaq = new OfferPageRealizationsAndFaqPOM(page)
  await realizationAndFaq.validateAllComponents()
  await realizationAndFaq.validateRealizationsImgsCountGreaterThen_3()

  const whyWoltair = new OfferPageWhyWoltairPOM(page)
  await whyWoltair.validateAllComponents()
})
