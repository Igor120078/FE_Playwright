/* eslint-disable import/order */
import { Locator, Page } from '@playwright/test'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import { LabelInterface } from '../../../components/interfaces/labelInterface'
import { HvacCalcStep7POM } from './hvacCalcStep7POM'

export class HvacCalcStep7bPOM extends HvacCalcStep7POM {
  private hvacCalcMetaTitle: LabelInterface
  private step7Title: LabelInterface
  private step7Subtitle: LabelInterface
  private regionsSelector: Locator
  private regionSubmitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'"))
      .setVisible(true)
    this.step7Title = ComponentFactory.createLabel().label().setLocator(this.page.locator("text='Vyberte Váš kraj'")) // should be translation key
    this.step7Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Každy region má jiný parametr k výpočtu tepelných ztrát dle normy')]")
      )
      .setVisible(true)
    this.regionsSelector = this.page.getByTestId('regionName')
    this.regionSubmitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('regionName-submit'))
      // .setTranslationKey('Pokračovat') // should be translation key
      .setVisible(true)

    this.arrowBack = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("img[alt='Šipka zpět']")) // should be translation key
      .setVisible(true)

    this.callMeInfo = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='woltadvisor.leaveUsNumber'"))
      .setVisible(true)
    this.callMeBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("text='woltadvisor.callMe'"))
      .setTranslationKey('woltadvisor.callMe')
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
    await this.step7Title.validateSelf()
    await this.step7Subtitle.validateSelf()
    await this.regionsSelector.isVisible()
    await this.regionSubmitBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async setLocation(location: { region: string; zipCode?: string }): Promise<void> {
    await this.regionsSelector.selectOption(location.region)
    await this.regionSubmitBtn.click()
    await this.regionSubmitBtn.waitToDisappear()
  }
}
