/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageFveComponentsPOM extends POM {
  private offerFveComponentsTitle: LabelInterface
  private offerFveComponentsBatteryImg: LabelInterface
  private offerFveComponentsBatteryTitle: LabelInterface
  private offerFveComponentsPanelsTitle: LabelInterface
  private offerFveComponentsInverterImg: LabelInterface
  private offerFveComponentsInverterTitle: LabelInterface

  constructor(page: Page) {
    super(page)

    this.offerFveComponentsTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.components', { exact: true }))
      .setVisible(true)
    this.offerFveComponentsBatteryImg = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("img[alt^='Baterie']"))
      .setVisible(true)
    this.offerFveComponentsBatteryTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//h5[contains(text(),'Baterie')]"))
      .setVisible(true)
    this.offerFveComponentsPanelsTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//h5[contains(text(),'Baterie')]"))
      .setVisible(true)
    this.offerFveComponentsInverterImg = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("img[alt^='Baterie']"))
      .setVisible(true)
    this.offerFveComponentsInverterTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//h5[contains(text(),'Střídač')]"))
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
    await this.offerFveComponentsTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.offerFveComponentsTitle.validateSelf()
    await this.offerFveComponentsBatteryImg.validateSelf()
    await this.offerFveComponentsBatteryTitle.validateSelf()
    await this.offerFveComponentsPanelsTitle.validateSelf()
    await this.offerFveComponentsInverterImg.validateSelf()
    await this.offerFveComponentsInverterTitle.validateSelf()
  }
}
