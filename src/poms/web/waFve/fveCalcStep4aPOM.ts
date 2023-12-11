/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep4aPOM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step4Title: LabelInterface
  private step4Subtitle: LabelInterface
  private heatingSourceBtn: ButtonInterface
  private electricBoilerBtn: ButtonInterface
  private otherBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step4Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Jakým způsobem ohříváte teplou vodu?')) // should be translation key
    this.step4Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Ohřev teplé vody představuje typicky 15–20 procent spotřeby energie')]")
      )
      .setVisible(true)
    this.heatingSourceBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('waterHeating-heatingSource'))
      // .setTranslationKey('')
      .setVisible(true)
    this.electricBoilerBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('waterHeating-electricBoiler'))
      // .setTranslationKey('')
      .setVisible(true)
    this.otherBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('waterHeating-other'))
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
    await this.step4Title.validateSelf()
    await this.step4Subtitle.validateSelf()
    await this.heatingSourceBtn.validateSelf()
    await this.electricBoilerBtn.validateSelf()
    await this.otherBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectElectricBoiler() {
    await this.electricBoilerBtn.click()
    await this.electricBoilerBtn.waitToDisappear()
  }
}
