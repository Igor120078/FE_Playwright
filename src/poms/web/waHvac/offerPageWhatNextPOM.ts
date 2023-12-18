/* eslint-disable import/order */
import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageWhatNextPOM extends POM {
  private whatNextTitle: LabelInterface
  private whatNextDescription: LabelInterface
  private personalMeetingBtn: ButtonInterface
  private phoneConsultation: LabelInterface
  private phoneConsultationBtn: ButtonInterface

  private lastMontages: Locator

  private moreInformationTitle: LabelInterface
  // private moreInformationSubtitle: LabelInterface

  constructor(page: Page) {
    super(page)

    this.whatNextTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='woltadvisor.offer.whatNext.title'"))
      .setVisible(true)
    this.whatNextDescription = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='woltadvisor.offer.whatNext.desc'"))
      .setVisible(true)
    this.personalMeetingBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("text='woltadvisor.offer.orderMeeting'"))
      .setTranslationKey('woltadvisor.offer.orderMeeting')
      .setVisible(true)
    this.phoneConsultation = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='woltadvisor.offer.phoneConsultation'"))
      .setVisible(true)
    this.phoneConsultationBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("text='meetings.orderPhoneMeeting'"))
      .setTranslationKey('meetings.orderPhoneMeeting')
      .setVisible(true)

    this.lastMontages = this.page.locator("a[href^='/tepelna-cerpadla/']")

    this.moreInformationTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//h4[contains(text(),'Chcete se dozvědět více o')]"))
      .setVisible(true)
    // this.moreInformationSubtitle = ComponentFactory.createLabel()
    // 	.label()
    // 	.setLocator(this.page.locator("//span[text()='Navštívit stránku s často kladenými dotazy']"))
    // 	.setVisible(true)
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
    await this.whatNextTitle.validateSelf()
    await this.whatNextDescription.validateSelf()
    await this.personalMeetingBtn.validateSelf()
    await this.phoneConsultation.validateSelf()
    await this.phoneConsultationBtn.validateSelf()
    await this.moreInformationTitle.validateSelf()
    // await this.moreInformationSubtitle.validateSelf()
  }

  async checkLastMontagesCount() {
    expect(await this.lastMontages.count()).toBeGreaterThan(0)
  }
}
