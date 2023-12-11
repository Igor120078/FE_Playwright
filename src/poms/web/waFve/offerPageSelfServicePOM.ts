/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageSelfServicePOM extends POM {
  protected selfServiceTitle: LabelInterface
  protected selfServiceText: LabelInterface
  protected selfServiceSubText: LabelInterface
  protected selfServiceBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.selfServiceTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.selfService.title', { exact: true }))
      .setVisible(true)
    this.selfServiceText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.selfService.text', { exact: true }))
      .setVisible(true)
    this.selfServiceSubText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.selfService.subtext', { exact: true }))
      .setVisible(true)
    this.selfServiceBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('web.offer.photovoltaics.selfService.button', { exact: true }))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = 'https://cz.staging.woltair.dev/fotovoltaika/nabidka?leadUid=87daafa0-7de8-4f2b-8dab-d36f360456fe'
    //PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {}
}
