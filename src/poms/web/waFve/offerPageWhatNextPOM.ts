/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageWhatNextPOM extends POM {
  private whatNextTitle: LabelInterface
  private whatNextDescription: LabelInterface
  private personalMeetingBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.whatNextTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.whatNext.title', { exact: true }))
      .setVisible(true)
    this.whatNextDescription = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.whatNext.desc', { exact: true }))
      .setVisible(true)
    this.personalMeetingBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('woltadvisor.offer.orderMeeting', { exact: true }))
      .setTranslationKey('woltadvisor.offer.orderMeeting')
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
    await this.whatNextTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.whatNextTitle.validateSelf()
    await this.whatNextDescription.validateSelf()
    await this.personalMeetingBtn.validateSelf()
  }
}
