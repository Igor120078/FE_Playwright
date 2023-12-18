/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class HvacCalcStep5aPOM extends POM {
  private hvacCalcMetaTitle: LabelInterface
  private step5aTitle: LabelInterface
  private step5aSubtitle: LabelInterface
  private heatLossInput: InputInterface
  private heatLossSubmitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step5aTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Vyplňte prosím údaj o tepelné ztrátě')) // should be translation key
    this.step5aSubtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Tepelná ztráta objektu je klíčový indikátor'))
      .setVisible(true)
    this.heatLossInput = ComponentFactory.createInput()
      .integerInput()
      .setLocator(this.page.getByTestId('houseHeatLoss'))
      .setVisible(true)
    this.heatLossSubmitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('houseHeatLoss-submit'))
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
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka?krok=4.5a'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.hvacCalcMetaTitle.validateSelf()
    await this.step5aTitle.validateSelf()
    await this.step5aSubtitle.validateSelf()
    await this.heatLossInput.validateSelf()
    await this.heatLossSubmitBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async fillHeatLoss(heatLoss: string) {
    await this.heatLossInput.sendTextToInput(heatLoss)
    await this.heatLossInput.validateSelf()
  }

  async submitHeatLoss() {
    await this.heatLossSubmitBtn.click()
    await this.heatLossSubmitBtn.waitToDisappear()
  }
}
