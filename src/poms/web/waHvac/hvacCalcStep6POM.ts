/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
import type { HvacCalcStep7POM } from './hvacCalcStep7POM'
import { HvacCalcStep7aPOM } from './hvacCalcStep7aPOM'
import { HvacCalcStep7bPOM } from './hvacCalcStep7bPOM'

export class HvacCalcStep6POM extends POM {
  private hvacCalcMetaTitle: LabelInterface
  private step6Title: LabelInterface
  private step6Subtitle: LabelInterface
  private airConditionYes: ButtonInterface
  private airConditionNo: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  private zipCodeInput: InputInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'"))
      .setVisible(true)
    this.step6Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='Máte klimatizaci, saunu nebo bazén?'")) // should be translation key
    this.step6Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator(
          "text='Typické energeticky náročné spotřebiče v domácnosti ovlivní výběr navrhovaného tepelného čerpadla.'"
        )
      )
      .setVisible(true)
    this.airConditionYes = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('airCondition-yes'))
      // .setTranslationKey('Ano') // tady by mel byt prekladovy klic, zatim nejsou implementovane
      .setVisible(true)
    this.airConditionNo = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('airCondition-no'))
      // .setTranslationKey('Ne') // tady by mel byt prekladovy klic, zatim nejsou implementovane
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

    this.zipCodeInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('floorSquare'))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka?krok=5'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.hvacCalcMetaTitle.validateSelf()
    await this.step6Title.validateSelf()
    await this.step6Subtitle.validateSelf()
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

  async checkIfVariantA() {
    return await this.zipCodeInput.validateVisible()
  }

  async selectStep7Variant(): Promise<HvacCalcStep7POM> {
    if (await this.checkIfVariantA()) {
      return new HvacCalcStep7aPOM(this.page)
    } else {
      return new HvacCalcStep7bPOM(this.page)
    }
  }
}
