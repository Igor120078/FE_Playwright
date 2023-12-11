/* eslint-disable import/order */
import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageFutureEnergyPaymentsOptimumPOM extends POM {
  private futurePaymentsTitle: LabelInterface
  private futurePaymentsCurrencyPerYear: LabelInterface
  private futurePaymentsYears: Locator
  private futurePaymentsCurrent: LabelInterface
  private futurePaymentsOptimum: LabelInterface
  private futurePaymentsConditions: LabelInterface

  constructor(page: Page) {
    super(page)

    this.futurePaymentsTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.futureEnergyPayments', { exact: true }))
      .setVisible(true)
    this.futurePaymentsCurrencyPerYear = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.currencyPerYear', { exact: true }))
      .setVisible(true)
    this.futurePaymentsYears = this.page.getByText('general.years', { exact: true })
    this.futurePaymentsCurrent = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.offerType.current', { exact: true }).nth(1))
      .setVisible(true)
    this.futurePaymentsOptimum = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('FVE_OFFER_TYPE.OPTIMUM', { exact: true }).nth(2))
      .setVisible(true)
    this.futurePaymentsConditions = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('* web.offer.futureEnergyPayments.conditions', { exact: true }))
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
    await this.futurePaymentsTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.futurePaymentsTitle.validateSelf()
    await this.futurePaymentsCurrencyPerYear.validateSelf()
    await this.futurePaymentsCurrent.validateSelf()
    await this.futurePaymentsOptimum.validateSelf()
    await this.futurePaymentsConditions.validateSelf()
  }

  async validateFutureEnergyPaymentsTableYearsCountEqual7() {
    expect(await this.futurePaymentsYears.count()).toEqual(7)
  }
}
