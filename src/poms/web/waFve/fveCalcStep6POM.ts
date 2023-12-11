/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep6POM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step6Title: LabelInterface
  private step6Subtitle: LabelInterface
  private zipCodeInput: InputInterface
  private zipCodeSubmitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step6Title = ComponentFactory.createLabel().label().setLocator(this.page.getByText('Zadejte PSČ instalace')) // should be translation key
    this.step6Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'PSČ nám pomůže určit potenciální výkon fotovoltaických panelů')]")
      )
      .setVisible(true)
    this.zipCodeInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('zipcode'))
      .setVisible(true)
    this.zipCodeSubmitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('zipcode-submit'))
      // .setTranslationKey('')
      .setVisible(true)
    this.arrowBack = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("img[alt='Šipka zpět']")) // should be translation key
      .setVisible(true)
    this.callMeInfo = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.leaveUsNumber'))
      .setVisible(true)
    this.callMeBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('woltadvisor.callMe'))
      .setTranslationKey('woltadvisor.callMe')
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.fveCalcMetaTitle.validateSelf()
    await this.step6Title.validateSelf()
    await this.step6Subtitle.validateSelf()
    await this.zipCodeInput.validateSelf()
    await this.zipCodeSubmitBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async fillZipCodeInput(zipCode: string) {
    await this.zipCodeInput.sendTextToInput(zipCode)
    await this.zipCodeInput.validateSelf()
  }

  async submitZipCode() {
    await this.zipCodeSubmitBtn.click()
    await this.zipCodeSubmitBtn.waitToDisappear()
  }
}
