/* eslint-disable import/order */
import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
import type { DynamicComponentInterface } from '../../../components/interfaces/dynamicComponentInterface'
import type { TableInterface } from '../../../components/interfaces/table/tableInterface'

export class OfferPageModelsTabsPOM extends POM {
  private modelsTabs: ButtonInterface
  private dynamicModelsTabs: DynamicComponentInterface<ButtonInterface>
  private productName: LabelInterface
  private pricesTable: TableInterface
  private modelPriceFull: Locator
  private modelGrants: Locator
  private modelPriceGrants: Locator

  private savingsTitle: LabelInterface
  private savingsEnergyText: LabelInterface
  private savingsEnergyValue: LabelInterface
  private savingsROIText: LabelInterface
  private savingsROIValue: LabelInterface
  private savingsCo2Text: LabelInterface
  private savingsCO2Value: LabelInterface
  private savingsYearlyText: LabelInterface
  private savingsYearlyValue: LabelInterface
  private savingsYearlyRecap: LabelInterface
  private currentPricesInfo: LabelInterface

  private detailsTitle: LabelInterface
  private detailsFloorText: LabelInterface
  private detailsFloorValue: LabelInterface
  private expectedFloorSquare: string
  private detailsHeatSourceText: LabelInterface
  private detailsHeatSourceValue: LabelInterface
  private detailsInsulationText: LabelInterface
  private detailsInsulationValue: LabelInterface
  private detailsWaterHeatingText: LabelInterface
  private detailsWaterHeatingValue: LabelInterface

  constructor(page: Page) {
    super(page)

    this.expectedFloorSquare = ''

    this.productName = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.HEAT_PUMP', { exact: true }))
      .setVisible(true)

    this.modelsTabs = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//div[@role='presentation']"))
    this.dynamicModelsTabs = ComponentFactory.createDynamicComponent()
      .defaultDynamicComponent<ButtonInterface>()
      .setComponent(this.modelsTabs)

    this.modelPriceFull = this.page.locator("(//table[@class='svelte-99hksx']/tr[1]/td[2])[1]")
    this.modelGrants = this.page.locator("(//table[@class='svelte-99hksx']/tr[2]/td[2])[1]")
    this.modelPriceGrants = this.page.locator("(//table[@class='svelte-99hksx']/tr[3]/td[2])[1]")

    this.pricesTable = ComponentFactory.createTable()
      .tableStaticWithoutHeader()
      .setLocator(this.page.locator('//table').nth(0))
      .setVisible(true)

    this.savingsTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.savings.title', { exact: true }))
      .setVisible(true)
    this.savingsEnergyText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.savings.energy', { exact: true }))
      .setVisible(true)
    this.savingsROIText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.savings.ROI', { exact: true }))
      .setVisible(true)
    this.savingsCo2Text = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.savings.co2', { exact: true }))
      .setVisible(true)
    this.savingsYearlyText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.savings.yearly']"))
      .setVisible(true)

    this.savingsEnergyValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.savings.energy']/following-sibling::td"))
      .setVisible(true)
    this.savingsROIValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.savings.ROI']/following-sibling::td"))
      .setVisible(true)
    this.savingsCO2Value = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='general.units.ton']"))
      .setVisible(true)
    this.savingsYearlyValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.savings.yearly']/following-sibling::td"))
      .setVisible(true)
    this.savingsYearlyRecap = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//h3[text()='web.offer.savings.yearly']"))
      .setVisible(true)
    this.currentPricesInfo = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.price.currentPrices').nth(1))
      .setVisible(true)

    this.detailsTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.yourDetails', { exact: true }))
      .setVisible(true)
    this.detailsFloorText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.details.floor', { exact: true }))
      .setVisible(true)
    this.detailsFloorValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.details.floor']/following-sibling::td"))
      .setVisible(true)
    this.detailsHeatSourceText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.details.heatSource', { exact: true }))
      .setVisible(true)
    this.detailsHeatSourceValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.details.heatSource']/following-sibling::td"))
      .setVisible(true)
    this.detailsInsulationText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.details.insulationType', { exact: true }))
      .setVisible(true)
    this.detailsInsulationValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.details.insulationType']/following-sibling::td"))
      .setVisible(true)
    this.detailsWaterHeatingText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.details.waterHeating', { exact: true }))
      .setVisible(true)
    this.detailsWaterHeatingValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.details.waterHeating']/following-sibling::td"))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl =
      PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka/?translationsShowKeys'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  setExpectedFloorSquare(square: string) {
    this.expectedFloorSquare = square
  }

  async validateAllComponents(): Promise<void> {
    await this.productName.validateSelf()
    await this.savingsTitle.validateSelf()
    await this.savingsEnergyText.validateSelf()
    await this.savingsEnergyValue.validateSelf()
    await this.savingsROIText.validateSelf()
    await this.savingsROIValue.validateSelf()
    await this.savingsCo2Text.validateSelf()
    await this.savingsCO2Value.validateSelf()
    await this.savingsYearlyText.validateSelf()
    await this.savingsYearlyValue.validateSelf()
    await this.savingsYearlyRecap.validateSelf()

    await this.detailsTitle.validateVisible()
    await this.detailsFloorText.validateVisible()
    await this.detailsFloorValue.validateVisible()
    await this.detailsHeatSourceText.validateVisible()
    await this.detailsHeatSourceValue.validateVisible()
    await this.detailsInsulationText.validateVisible()
    await this.detailsInsulationValue.validateVisible()
    await this.detailsWaterHeatingText.validateVisible()
    await this.detailsWaterHeatingValue.validateVisible()

    await this.currentPricesInfo.validateSelf()
  }

  async checkModelsTabsCount() {
    let modelsCount = await this.dynamicModelsTabs.count()
    console.log(`There are ${modelsCount} heat pumps models in the offer`)
    expect.soft(modelsCount).toBeGreaterThan(0)
  }

  async checkModelsTabsContent() {
    let modelText: string
    let num = 0
    const arrayOfModels: ButtonInterface[] = await this.dynamicModelsTabs.readAll()

    for (const model of arrayOfModels) {
      num++
      await model.click()
      modelText = await model.readElementText()
      let modelName = modelText.split('\n')[0].trim()
      expect(modelName.length).toBeGreaterThan(1)
      console.log(`Model ${num} name: ${modelName}`)

      let modelPrice = parseInt(modelText.replace(/\D+/g, ''))
      expect(modelPrice).toBeGreaterThan(1000)
      console.log(`Model ${num} price in tab: ${modelPrice}`)

      let fullPrice = parseInt((await this.modelPriceFull.textContent())!.replace(/\D+/g, ''))
      console.log(`Model ${num} full price: ${fullPrice}`)
      expect(fullPrice).toEqual(modelPrice)

      let govGrants = parseInt((await this.modelGrants.textContent())!.replace(/\D+/g, ''))
      console.log(`Model ${num} government grants: ${govGrants}`)
      expect(govGrants.toString().length).toBeGreaterThan(0)

      let modelPriceGrantsNumber = parseInt((await this.modelPriceGrants.textContent())!.replace(/\D+/g, ''))
      console.log(`Model ${num} price grants: ${modelPriceGrantsNumber}`)
      expect(modelPriceGrantsNumber).toEqual(modelPrice - govGrants)

      let savingsEnergy = parseInt((await this.savingsEnergyValue.readElementText()).replace(/\D+/g, ''))
      console.log(`Model ${num} energy savings: ${savingsEnergy}`)
      expect(savingsEnergy).toBeGreaterThan(0)
      let savingsROI = parseInt((await this.savingsROIValue.readElementText()).replace(/\D+/g, ''))
      console.log(`Model ${num} ROI savings: ${savingsROI}`)
      expect(savingsROI).toBeGreaterThan(0)
      // savingsCO2Value doesn't have a number, only translations key
      //   let savingsCO2 = Number.parseFloat((await this.savingsCO2Value.getText()).replace(/\D+/g, ''))
      //   console.log(`Model ${num} CO2 savings: ${savingsCO2}`)
      //   expect(savingsCO2).toBeGreaterThan(0)
      let savingsYearly = parseInt((await this.savingsYearlyValue.readElementText()).replace(/\D+/g, ''))
      console.log(`Model ${num} yearly savings: ${savingsYearly}`)
      expect(savingsYearly).toBeGreaterThan(0)
      let savingsYearlyRecapSum = parseInt((await this.savingsYearlyRecap.readElementText()).replace(/\D+/g, ''))
      expect(savingsYearlyRecapSum).toEqual(savingsYearly)
      let detailsFloorSquare = parseInt((await this.detailsFloorValue.readElementText()).replace(/\D+/g, ''))
      expect(detailsFloorSquare).toEqual(parseInt(this.expectedFloorSquare))

      await this.page.waitForTimeout(300)
    }
  }

  async readTable() {
    return await this.pricesTable.readVisibleData()
  }
}
