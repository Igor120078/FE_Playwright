/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageCallMePOM extends POM {
  private offerPhoneConsultationTitle: LabelInterface
  private offerPhoneConsultationOrder: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.offerPhoneConsultationTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.phoneConsultation', { exact: true }))
      .setVisible(true)
    this.offerPhoneConsultationOrder = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('meetings.orderPhoneMeeting', { exact: true }))
      .setTranslationKey('meetings.orderPhoneMeeting')
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
    await this.offerPhoneConsultationTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.offerPhoneConsultationTitle.validateSelf()
    await this.offerPhoneConsultationOrder.validateSelf()
  }
}
