/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class HomePagePersonalMeetingPOM extends POM {
  private contactsTitle: LabelInterface
  private contactsDescription: LabelInterface
  private contactsImg: LabelInterface
  private personalMeetingBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.contactsTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.homepage.contacts.title', { exact: true }))
      .setVisible(true)
    this.contactsDescription = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.homepage.contacts.desc', { exact: true }))
      .setVisible(true)
    this.contactsImg = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("img[alt='web.homepage.contacts.img.alt']"))
      .setVisible(true)
    this.personalMeetingBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('web.homepage.contacts.button'))
      .setTranslationKey('web.homepage.contacts.button')
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('WEB_BASE_URL_CZ') + '/?translationsShowKeys'
    await this.page.goto(testUrl)
  }

  // Tohle je berle pro zviditelneni translations keys
  async makeAllTranslationsKeysVisible() {
    await this.page.getByTestId('page-link-hvac').click()
    await this.page.getByTestId('calculator').waitFor()
    await this.goBack()
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.contactsTitle.validateSelf()
    await this.contactsDescription.validateSelf()
    await this.contactsImg.validateSelf()
    await this.personalMeetingBtn.validateSelf()
  }

  async startPersonalMeetingForm() {
    await this.personalMeetingBtn.click()
  }
}
