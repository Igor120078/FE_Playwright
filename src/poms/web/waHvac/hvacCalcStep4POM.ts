/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class HvacCalcStep4POM extends POM {
  private hvacCalcMetaTitle: LabelInterface
  private step4Title: LabelInterface
  private step4Subtitle: LabelInterface
  private floorSquareInput: InputInterface
  private floorSquareSubmitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'"))
      .setVisible(true)
    this.step4Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='Jaká je podlahová plocha vytápěných místností?'")) // should be translation key
    this.step4Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator(
          "text='Celková plocha ovlivňuje množství energie potřebné k vytápění i k provozu dalších zařízení.'"
        )
      )
      .setVisible(true)
    this.floorSquareInput = ComponentFactory.createInput()
      .integerInput()
      .setLocator(this.page.getByTestId('floorSquare'))
      .setVisible(true)
    this.floorSquareSubmitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('floorSquare-submit'))
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
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka?krok=3'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.hvacCalcMetaTitle.validateSelf()
    await this.step4Title.validateSelf()
    await this.step4Subtitle.validateSelf()
    await this.floorSquareInput.validateSelf()
    await this.floorSquareSubmitBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async fillFloorSquare(square: string) {
    await this.floorSquareInput.sendTextToInput(square)
    await this.floorSquareInput.validateSelf()
  }

  async submitFloorSquare() {
    await this.floorSquareSubmitBtn.click()
    await this.floorSquareSubmitBtn.waitToDisappear()
  }
}
