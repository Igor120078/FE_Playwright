/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
// import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
import dotenv from 'dotenv'
dotenv.config()

export class HomePagePOM extends POM {
  private homePageHeading: LabelInterface
  private homePageSubheading: LabelInterface
  private homePageReferencesHeading: LabelInterface
  private homePageReferencesSubtext: LabelInterface
  private homePageCalcBtn: ButtonInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.homePageHeading = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.homepage.PUBLIC.header.heading'"))
      .setVisible(true)
    this.homePageSubheading = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.homepage.PUBLIC.header.subheading'"))
      .setVisible(true)
    this.homePageReferencesHeading = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.components.THUMBNAILS.heading'"))
      .setVisible(true)
    this.homePageReferencesSubtext = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.homepage.PUBLIC.header.referencesSubtext'"))
      .setVisible(true)
    this.homePageCalcBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('page-link-calculator'))
      .setTranslationKey('web.homepage.PUBLIC.header.calculator.text')
      .setVisible(true)
    this.callMeBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('meeting'))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    // const testUrl = PropertiesManager.getProperty('WEB_BASE_URL_CZ') + '/?translationsShowKeys'
    const testUrl = `${process.env.WEB_BASE_URL_CZ}/?translationsShowKeys`
    await this.page.goto(testUrl)
  }

  // Tohle je berle pro zviditelneni translations keys
  async makeAllTranslationsKeysVisible(): Promise<void> {
    await this.page.getByTestId('page-link-hvac').click()
    await this.page.getByTestId('calculator').waitFor()
    await this.goBack()
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.homePageHeading.validateSelf()
    await this.homePageSubheading.validateSelf()
    await this.homePageReferencesHeading.validateSelf()
    await this.homePageReferencesSubtext.validateSelf()
    await this.homePageCalcBtn.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async startCallMeForm(): Promise<void> {
    await this.callMeBtn.click()
  }
  async startCalculator(): Promise<void> {
    await this.homePageCalcBtn.click()
  }
}
