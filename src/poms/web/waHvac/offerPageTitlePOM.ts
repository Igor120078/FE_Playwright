/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
export class OfferPageTitlePOM extends POM {
  private woltadvisorTitle: LabelInterface
  private offerIntro: LabelInterface
  private offerSuperTitle: LabelInterface
  private offerTitle: LabelInterface
  private offerAboutText: LabelInterface

  constructor(page: Page) {
    super(page)

    this.woltadvisorTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.title', { exact: true }))
      .setVisible(true)
    this.offerIntro = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.pretext.intro', { exact: true }))
      .setVisible(true)
    this.offerSuperTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.pretext.superTitle', { exact: true }))
      .setVisible(true)
    this.offerTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.pretext.title', { exact: true }))
      .setVisible(true)
    this.offerAboutText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.noOffer', { exact: true }))
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

  async validateAllComponents(): Promise<void> {
    await this.woltadvisorTitle.validateSelf()
    await this.offerIntro.validateSelf()
    await this.offerSuperTitle.validateSelf()
    await this.offerTitle.validateSelf()
    await this.offerAboutText.validateSelf()
  }

  async waitForOfferPage() {
    await this.woltadvisorTitle.waitToAppear(45000)
    console.log(`Offer url:\n${this.page.url()}`)
  }
}
