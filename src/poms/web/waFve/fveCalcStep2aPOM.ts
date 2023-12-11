/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep2aPOM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step2aTitle: LabelInterface
  private step2aSubtitle: LabelInterface
  private consumptionInput: InputInterface
  private consumptionSubmitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step2aTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Vyplňte prosím roční spotřebu elektřiny')) // should be translation key
    this.step2aSubtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Vaše současná spotřeba elektřiny je klíčová informace pro návrh')]")
      )
      .setVisible(true)
    this.consumptionInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('annualyElectroConsumption'))
      .setVisible(true)
    this.consumptionSubmitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('annualyElectroConsumption-submit'))
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
    await this.step2aTitle.validateSelf()
    await this.step2aSubtitle.validateSelf()
    await this.consumptionInput.validateSelf()
    await this.consumptionSubmitBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async fillConsumptionInput(consumption: string) {
    await this.consumptionInput.sendTextToInput(consumption)
    await this.consumptionInput.validateSelf()
  }

  async submitConsumption() {
    await this.consumptionSubmitBtn.click()
    await this.consumptionSubmitBtn.waitToDisappear()
  }
}
