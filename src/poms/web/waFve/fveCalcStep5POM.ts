/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep5POM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step5Title: LabelInterface
  private step5Subtitle: LabelInterface
  private airConditionYes: ButtonInterface
  private airConditionNo: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step5Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Máte klimatizaci, saunu nebo bazén?')) // should be translation key
    this.step5Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator(
          "//*[contains(text(),'Typické energeticky náročné spotřebiče v domácnosti ovlivní velikost')]"
        )
      )
      .setVisible(true)
    this.airConditionYes = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('airCondition-yes'))
      // .setTranslationKey('1')
      .setVisible(true)
    this.airConditionNo = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('airCondition-no'))
      // .setTranslationKey('2')
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
    await this.step5Title.validateSelf()
    await this.step5Subtitle.validateSelf()
    await this.airConditionYes.validateSelf()
    await this.airConditionNo.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectYes() {
    await this.airConditionYes.click()
    await this.airConditionYes.waitToDisappear()
  }

  async selectNo() {
    await this.airConditionNo.click()
    await this.airConditionNo.waitToDisappear()
  }
}
