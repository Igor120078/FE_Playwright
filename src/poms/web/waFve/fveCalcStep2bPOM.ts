/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep2bPOM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step2bTitle: LabelInterface
  private step2bSubtitle: LabelInterface
  private floorSquareInput: InputInterface
  private floorSquareSubmitBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step2bTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Jaká je podlahová plocha vytápěných místností?')) // should be translation key
    this.step2bSubtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Celková plocha ovlivňuje množství energie potřebné k vytápění')]")
      )
      .setVisible(true)
    this.floorSquareInput = ComponentFactory.createInput()
      .integerInput()
      .setLocator(this.page.getByTestId('floorSquare'))
      .setVisible(true)
    this.floorSquareSubmitBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('floorSquare-submit'))
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
    await this.step2bTitle.validateSelf()
    await this.step2bSubtitle.validateSelf()
    await this.floorSquareInput.validateSelf()
    await this.floorSquareSubmitBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async fillFloorSquareInput(square: string) {
    await this.floorSquareInput.sendTextToInput(square)
    await this.floorSquareInput.validateSelf()
  }

  async submitFloorSquare() {
    await this.floorSquareSubmitBtn.click()
    await this.floorSquareSubmitBtn.waitToDisappear()
  }
}
