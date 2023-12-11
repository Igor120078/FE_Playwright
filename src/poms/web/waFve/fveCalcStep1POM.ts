/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep1POM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step1Title: LabelInterface
  private step1Subtitle: LabelInterface
  private knowConsumption: ButtonInterface
  private knowFloorSquare: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step1Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Znáte svoji roční spotřebu elektřiny?')) // should be translation key
    this.step1Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Vaše současná spotřeba elektřiny je klíčová informace pro návrh')]")
      )
      .setVisible(true)
    this.knowConsumption = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('variant-a'))
      // .setTranslationKey('1')
      .setVisible(true)
    this.knowFloorSquare = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('variant-b'))
      // .setTranslationKey('2')
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
    await this.step1Title.validateSelf()
    await this.step1Subtitle.validateSelf()
    await this.knowConsumption.validateSelf()
    await this.knowFloorSquare.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectKnowConsumption() {
    await this.knowConsumption.click()
    await this.knowConsumption.waitToDisappear()
  }

  async selectKnowFloorSquare() {
    await this.knowFloorSquare.click()
    await this.knowFloorSquare.waitToDisappear()
  }
}
