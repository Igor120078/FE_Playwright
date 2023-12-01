import { Page } from '@playwright/test'
import { POM } from '../../pom.js'
import { ComponentFactory } from '../../../components/factory/componentFactory.js'
import { ButtonInterface } from '../../../components/interfaces/buttonInterface.js'
import { InputInterface } from '../../../components/interfaces/inputInterface.js'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager.js'
import { LabelInterface } from '../../../components/interfaces/labelInterface.js'

export class SuperfixLandingPagePOM extends POM {
  protected loginViaEmail_linkButton: ButtonInterface
  protected loginViaPhone_linkButton: ButtonInterface
  protected loginSubmit_button: ButtonInterface
  protected loginSecretCode_input: InputInterface
  protected loginPhone_input: InputInterface
  protected loginEmail_input: InputInterface
  protected successElement_label: LabelInterface

  constructor(page: Page) {
    super(page)

    this.loginViaEmail_linkButton = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator('//*[.="login.btn.loginType.email"]'))
      .setVisible(true)
    this.loginViaPhone_linkButton = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[.='login.btn.loginType.phone']"))
      .setVisible(false)
    this.loginSubmit_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('otpCode-button'))
      .setTranslationKey('auth.otpBtn')
      .setEnabled(false)
      .setVisible(true)
    this.loginSecretCode_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('otpCode-Input'))
    this.loginEmail_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('login.input.placeholder.email'))
      .setVisible(false)
    this.loginPhone_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('login.input.placeholder.phone'))
    this.successElement_label = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//aside[contains(@class,'navigation')]"))
      .setVisible(false)
  }

  async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty('SUPERFIX_BASE_URL_CZ'))
    await this.validateAllComponents()
  }
  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async switchLoginTypeToEmail(): Promise<void> {
    await this.loginViaEmail_linkButton.click()
    await this.loginEmail_input.waitToAppear()
    this.loginPhone_input.setVisible(false)
    this.loginEmail_input.setVisible(true).setEnabled(true)
    this.loginViaEmail_linkButton.setVisible(false)
    this.loginViaPhone_linkButton.setVisible(true)
    await this.validateAllComponents()
  }

  async setEmail(phoneNumber: string) {
    await this.loginEmail_input.sendTextToInput(phoneNumber)
    this.loginSubmit_button.setEnabled(true).setVisible(true)
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
    await this.loginSecretCode_input.sendTextToInput(secretCode)
  }
}
