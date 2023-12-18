/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class HvacCalcStep5POM extends POM {
  private hvacCalcMetaTitle: LabelInterface
  private step5Title: LabelInterface
  private step5Subtitle: LabelInterface
  private heatLossYes: ButtonInterface
  private heatLossNo: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step5Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Znáte tepelnou ztrátu domu?')) // should be translation key
    this.step5Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Tepelná ztráta objektu je klíčový indikátor'))
      .setVisible(true)
    this.heatLossYes = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('houseHeatLoss-yes'))
      // .setTranslationKey('')
      .setVisible(true)
    this.heatLossNo = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('houseHeatLoss-no'))
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
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka?krok=4'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.hvacCalcMetaTitle.validateSelf()
    await this.step5Title.validateSelf()
    await this.step5Subtitle.validateSelf()
    await this.heatLossYes.validateSelf()
    await this.heatLossNo.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectYes() {
    await this.heatLossYes.click()
    await this.heatLossYes.waitToDisappear()
  }

  async selectNo() {
    await this.heatLossNo.click()
    await this.heatLossNo.waitToDisappear()
  }
}
