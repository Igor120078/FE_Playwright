/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep3POM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step3Title: LabelInterface
  private step3Subtitle: LabelInterface
  private heatTypeElectroBtn: ButtonInterface
  private heatTypeHeatPumpBtn: ButtonInterface
  private heatTypeOtherBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step3Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Jakým způsobem vytápíte dům?')) // should be translation key
    this.step3Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Energie na vytápění typicky představuje až 70 procent energie')]")
      )
      .setVisible(true)
    this.heatTypeElectroBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('houseHeatType-electro'))
      // .setTranslationKey('')
      .setVisible(true)
    this.heatTypeHeatPumpBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('houseHeatType-heatpump'))
      // .setTranslationKey('')
      .setVisible(true)
    this.heatTypeOtherBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('houseHeatType-other'))
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
    await this.step3Title.validateSelf()
    await this.step3Subtitle.validateSelf()
    await this.heatTypeElectroBtn.validateSelf()
    await this.heatTypeHeatPumpBtn.validateSelf()
    await this.heatTypeOtherBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectHeatTypeOther() {
    await this.heatTypeOtherBtn.click()
    await this.heatTypeOtherBtn.waitToDisappear()
  }
}
