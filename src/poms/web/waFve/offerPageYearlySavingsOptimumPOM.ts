/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageYearlySavingsOptimumPOM extends POM {
  private yearlySavingsTheoreticalTitle: LabelInterface
  private yearlySavingsOptimumText: LabelInterface
  private yearlySavingsOptimumValue: LabelInterface

  constructor(page: Page) {
    super(page)

    this.yearlySavingsTheoreticalTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.yearlySavingsTheoretical', { exact: true }))
      .setVisible(true)
    this.yearlySavingsOptimumText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('FVE_OFFER_TYPE.OPTIMUM', { exact: true }).nth(1))
      .setVisible(true)
    this.yearlySavingsOptimumValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("(//div[text()='FVE_OFFER_TYPE.OPTIMUM'])[2]/following-sibling::div"))
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
    await this.yearlySavingsTheoreticalTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.yearlySavingsTheoreticalTitle.validateSelf()
    await this.yearlySavingsOptimumText.validateSelf()
    await this.yearlySavingsOptimumValue.validateSelf()
  }

  async validateYearlySavingsValues() {
    let optimumSavings = Number((await this.yearlySavingsOptimumValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Yearly savings Optimum: ${optimumSavings}`)
    expect(optimumSavings).toBeGreaterThan(10)
  }
}
