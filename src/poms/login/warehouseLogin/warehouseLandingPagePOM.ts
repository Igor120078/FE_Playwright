import { Page } from '@playwright/test'
import { ComponentFactory } from '../../../components/factory/componentFactory.js'
import { ButtonInterface } from '../../../components/interfaces/buttonInterface.js'
import { InputInterface } from '../../../components/interfaces/inputInterface.js'
import { POM } from '../../pom.js'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager.js'
import { LabelInterface } from '../../../components/interfaces/labelInterface.js'

export class WarehouseLandingPagePOM extends POM {
  protected loginSubmit_button: ButtonInterface
  protected loginSecretCode_input: InputInterface
  protected loginEmail_input: InputInterface
  protected successElement_label: LabelInterface

  constructor(page: Page) {
    super(page)

    this.loginSubmit_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('test-login-button'))
      .setTranslationKey('auth.otpBtn')
      .setEnabled(false)
      .setVisible(true)
      .setReadonly(false)

    this.loginEmail_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('test-input-email'))
      .setEnabled(true)
      .setVisible(true)
      .setReadonly(false)

    this.loginSecretCode_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('test-input-token'))
      .setVisible(false)
    this.successElement_label = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//aside[contains(@class,'navigation')]"))
      .setVisible(false)
  }

  public async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ'))
  }
  public async goBack(): Promise<void> {
    this.page.goBack()
  }

  async setEmail(phoneNumber: string) {
    this.loginEmail_input.sendTextToInput(phoneNumber)
    this.loginSubmit_button.setEnabled(true).setVisible(true).setReadonly(false)
    await this.validateAllComponents()
  }

  async requestCode() {
    await this.loginSubmit_button.click()
    await this.loginSecretCode_input.setVisible(true).setReadonly(true).setEnabled(true)
  }

  async submit() {
    await this.loginSubmit_button.click()
    this.successElement_label.setVisible(true)
    await this.successElement_label.waitToAppear(20000)
  }

  async setSecretCode(secretCode: string) {
    this.loginSecretCode_input.sendTextToInput(secretCode)
  }
}
