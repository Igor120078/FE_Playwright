/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageMonthlyConsumptionOptimumPOM extends POM {
  private monthlyConsumptionTitle: LabelInterface
  private monthlyConsumptionCurrent: LabelInterface
  private monthlyConsumptionOptimum: LabelInterface
  private graphMonthlyConsumption: LabelInterface

  constructor(page: Page) {
    super(page)

    this.monthlyConsumptionTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.monthlyConsumption', { exact: true }))
      .setVisible(true)
    this.monthlyConsumptionCurrent = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.offerType.current', { exact: true }).nth(0))
      .setVisible(true)
    this.monthlyConsumptionOptimum = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.offerType.optimum', { exact: true }).nth(0))
      .setVisible(true)
    this.graphMonthlyConsumption = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator('(//canvas)[2]'))
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
    await this.monthlyConsumptionTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.monthlyConsumptionTitle.validateSelf()
    await this.monthlyConsumptionCurrent.validateSelf()
    await this.monthlyConsumptionOptimum.validateSelf()
    await this.graphMonthlyConsumption.validateSelf()
  }
}
