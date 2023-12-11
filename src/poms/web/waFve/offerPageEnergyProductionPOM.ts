/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageEnergyProductionPOM extends POM {
  private monthlyEnergyProductionTitle: LabelInterface
  private graphMonthlyEnergyProduction: LabelInterface

  constructor(page: Page) {
    super(page)

    this.monthlyEnergyProductionTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('offer.graphs.monthlyEnergyProduction', { exact: true }))
      .setVisible(true)
    this.graphMonthlyEnergyProduction = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator('(//canvas)[3]'))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl =
      // 'https://cz.staging.woltair.dev/fotovoltaika/nabidka?leadUid=c6c82e53-6235-4efc-8acb-58fbc0ef480e'
      PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async waitForOfferPage() {
    await this.monthlyEnergyProductionTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.monthlyEnergyProductionTitle.validateSelf()
    await this.graphMonthlyEnergyProduction.validateSelf()
  }
}
