/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
import type { CheckboxInterface } from '../../../components/interfaces/checkboxInterface'

export class HvacCalcStep8POM extends POM {
  private hvacCalcMetaTitle: LabelInterface
  private step8Title: LabelInterface
  private emailInput: InputInterface
  private phoneInput: InputInterface
  private promoCodeBox: CheckboxInterface
  private promoCodeText: LabelInterface
  private personalMeetingBox: CheckboxInterface
  private personalMeetingText: LabelInterface
  private submitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private woltairConditions: LabelInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'"))
      .setVisible(true)
    this.step8Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='Nabídku vám okamžitě zašleme na email'")) // should be translation key
    this.emailInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('email'))
      .setVisible(true)
    this.phoneInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('phone'))
      .setVisible(true)
    this.promoCodeBox = ComponentFactory.createCheckbox()
      .checkbox()
      .setLocator(this.page.locator("input[id='affiliateCodeShow']"))
      .setVisible(true)
    this.promoCodeText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='Zadat promo kód'"))
      .setVisible(true)
    this.personalMeetingBox = ComponentFactory.createCheckbox()
      .checkbox()
      .setLocator(this.page.getByTestId('personalMeeting'))
      .setVisible(true)
    this.personalMeetingText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='Mám zájem o schůzku s expertem'"))
      .setVisible(true)
    this.submitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('submit'))
      // .setTranslationKey('') // should be translation key
      .setVisible(true)
    this.arrowBack = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("img[alt='Šipka zpět']")) // should be translation key
      .setVisible(true)

    this.woltairConditions = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='general.woltairConditions'"))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka?krok=6'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.hvacCalcMetaTitle.validateSelf()
    await this.step8Title.validateSelf()
    await this.emailInput.validateSelf()
    await this.phoneInput.validateSelf()
    await this.promoCodeBox.validateSelf()
    await this.promoCodeText.validateSelf()
    await this.personalMeetingBox.validateSelf()
    await this.personalMeetingText.validateSelf()
    await this.arrowBack.validateSelf()
    await this.submitBtn.validateSelf()
    await this.woltairConditions.validateSelf()
  }

  async fillEmailInput(email: string) {
    await this.emailInput.sendTextToInput(email)
    await this.emailInput.validateSelf()
  }
  async fillPhoneInput(phone: string) {
    await this.phoneInput.sendTextToInput(phone)
    await this.phoneInput.validateSelf()
  }

  async submitForm() {
    await this.submitBtn.click()
    await this.submitBtn.waitToDisappear()
  }
}
