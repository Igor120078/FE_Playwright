/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPagePricesPOM extends POM {
  private priceOfferText: LabelInterface
  private fullPriceText: LabelInterface
  private fullPriceValue: LabelInterface
  private subsidyText: LabelInterface
  private subsidyValue: LabelInterface
  private priceAfterSubsidyText: LabelInterface
  private priceAfterSubsidyValue: LabelInterface
  private yearlySavingsText: LabelInterface
  private yearlySavingsValue: LabelInterface
  private offerPdfDownload: LabelInterface
  private offerPdfDownloadBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.priceOfferText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.priceOffer', { exact: true }))
      .setVisible(true)
    this.fullPriceText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.fullPrice', { exact: true }))
      .setVisible(true)
    this.fullPriceValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.fullPrice']/following-sibling::td"))
      .setVisible(true)
    this.subsidyText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.subsidy', { exact: true }))
      .setVisible(true)
    this.subsidyValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.subsidy']/following-sibling::td"))
      .setVisible(true)
    this.priceAfterSubsidyText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.priceAfterSubsidy', { exact: true }))
      .setVisible(true)
    this.priceAfterSubsidyValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.priceAfterSubsidy']/following-sibling::td"))
      .setVisible(true)
    this.yearlySavingsText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.yearlySavings', { exact: true }))
      .setVisible(true)
    this.yearlySavingsValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='web.offer.yearlySavings']/following-sibling::td"))
      .setVisible(true)
    this.offerPdfDownload = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.pdf.download'))
      .setVisible(true)
    this.offerPdfDownloadBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('web.offer.download.buttonText', { exact: true }))
      // .setTranslationKey('')
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
    await this.priceOfferText.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.priceOfferText.validateSelf()
    await this.fullPriceText.validateSelf()
    await this.fullPriceValue.validateSelf()
    await this.subsidyText.validateSelf()
    await this.subsidyValue.validateSelf()
    await this.priceAfterSubsidyText.validateSelf()
    await this.priceAfterSubsidyValue.validateSelf()
    await this.yearlySavingsText.validateSelf()
    await this.yearlySavingsValue.validateSelf()
    await this.offerPdfDownload.validateSelf()
    await this.offerPdfDownloadBtn.validateSelf()
  }

  async validateOfferPrices() {
    let fullPrice = Number((await this.fullPriceValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Full price: ${fullPrice}`)
    expect(fullPrice).toBeGreaterThan(1)
    let subsidy = Number((await this.subsidyValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Subsidy: ${subsidy}`)
    expect(subsidy).toBeGreaterThan(1)
    let resultPrice = Number((await this.priceAfterSubsidyValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Price after subsidy: ${resultPrice}`)
    expect(resultPrice).toBeGreaterThan(1)
    expect(fullPrice - subsidy).toEqual(resultPrice)
    let savings = Number((await this.yearlySavingsValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Savings: ${savings}`)
    expect(savings).toBeGreaterThan(1)
  }
}
