/* eslint-disable import/order */
import { expect, type Locator, type Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageRealizationsAndFaqPOM extends POM {
  private realizationsImgs: LabelInterface
  private realizationsImgsSimple: Locator
  private knowMoreTitle: LabelInterface
  private knowMoreBtn: ButtonInterface

  constructor(page: Page) {
    super(page)
    this.realizationsImgsSimple = this.page.locator("img[alt^='Produkt']")
    this.realizationsImgs = ComponentFactory.createLabel().label().setLocator(this.page.locator("img[alt^='Produkt']"))
    this.knowMoreTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Chcete se dozvědět více'))
      .setVisible(true)
    this.knowMoreBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('web.offer.faqButton'))
      .setTranslationKey('web.offer.faqButton')
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
    await this.knowMoreTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.knowMoreTitle.validateSelf()
    await this.knowMoreBtn.validateSelf()
  }

  async validateRealizationsImgsCountGreaterThen_3() {
    const realizationImgsAll = ComponentFactory.createDynamicComponent()
      .defaultDynamicComponent<LabelInterface>()
      .setComponent(this.realizationsImgs)
    expect(await realizationImgsAll.count()).toBeGreaterThan(3)

    expect(await this.realizationsImgsSimple.count()).toBeGreaterThan(3)
  }
}
