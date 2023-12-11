/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageFveParametersPOM extends POM {
  private fveOfferTitle: LabelInterface
  private offerInEmailText: LabelInterface
  private performanceText: LabelInterface
  private performanceValue: LabelInterface
  private panelCountText: LabelInterface
  private panelCountValue: LabelInterface
  private batteryCapacityText: LabelInterface
  private batteryCapacityValue: LabelInterface
  private productionText: LabelInterface
  private productionValue: LabelInterface

  constructor(page: Page) {
    super(page)

    this.fveOfferTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.title', { exact: true }))
      .setVisible(true)
    this.offerInEmailText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.noOffer', { exact: true }))
      .setVisible(true)
    this.performanceText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.output', { exact: true }))
      .setVisible(true) // should be translation key
    this.performanceValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()[contains(.,'web.offer.photovoltaics.outputUnit')]]"))
      .setVisible(true)
    this.panelCountText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.panelNumber', { exact: true }))
      .setVisible(true)
    this.panelCountValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()[contains(.,'web.offer.photovoltaics.panelNumberUnit')]]"))
      .setVisible(true)
    this.batteryCapacityText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.batteryCapacity', { exact: true }))
      .setVisible(true)
    this.batteryCapacityValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()[contains(.,'web.offer.photovoltaics.batteryCapacityUnit')]]"))
      .setVisible(true)
    this.productionText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.expectedProduction', { exact: true }))
      .setVisible(true)
    this.productionValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()[contains(.,'web.offer.photovoltaics.expectedProductionUnit')]]"))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = 'https://cz.staging.woltair.dev/fotovoltaika/nabidka?leadUid=c6c82e53-6235-4efc-8acb-58fbc0ef480e'
    //PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async waitForOfferPage() {
    await this.fveOfferTitle.waitToAppear(45000)
    console.log(`Final URL: ${await this.page.url()}`)
  }

  async validateAllComponents(): Promise<void> {
    await this.fveOfferTitle.validateSelf()
    await this.offerInEmailText.validateSelf()
    await this.performanceText.validateSelf()
    await this.performanceValue.validateSelf()
    await this.panelCountText.validateSelf()
    await this.panelCountValue.validateSelf()
    await this.batteryCapacityText.validateSelf()
    await this.batteryCapacityValue.validateSelf()
    await this.productionText.validateSelf()
    await this.productionValue.validateSelf()
  }

  async validatePhotovoltaicParameters() {
    let performance = Number((await this.performanceValue.readElementText()).replace(',', '.').split(' ')[0])
    console.log(`Photovoltaic performance: ${performance} kWp`)
    await expect(performance).toBeGreaterThan(1)

    let panelNumber = Number((await this.panelCountValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Photovoltaic panel number: ${panelNumber} ks`)
    expect(panelNumber).toBeGreaterThan(1)

    let batteryCapacity = Number((await this.batteryCapacityValue.readElementText()).replace(',', '.').split(' ')[0])
    console.log(`Photovoltaic battery capacity: ${batteryCapacity} kWh`)
    expect(batteryCapacity).toBeGreaterThan(1)

    let production = Number((await this.productionValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Photovoltaic expected production: ${production} kWp`)
    expect(production).toBeGreaterThan(1)
  }
}
