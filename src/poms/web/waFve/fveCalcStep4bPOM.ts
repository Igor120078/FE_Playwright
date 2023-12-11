/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep4bPOM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step5Title: LabelInterface
  private step5Subtitle: LabelInterface
  private peopleCount1: ButtonInterface
  private peopleCount2: ButtonInterface
  private peopleCount3: ButtonInterface
  private peopleCount4: ButtonInterface
  private peopleCount5: ButtonInterface
  private peopleCount6: ButtonInterface
  private peopleCountMore: ButtonInterface
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
      .setLocator(this.page.getByText('Pro kolik osob chcete ohřívat teplou vodu?')) // should be translation key
    this.step5Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator(
          "//*[contains(text(),'Každý člověk zvyšuje spotřebu energie, je proto důležité zohlednit počet')]"
        )
      )
      .setVisible(true)
    this.peopleCount1 = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-1'))
      // .setTranslationKey('')
      .setVisible(true)
    this.peopleCount2 = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-2'))
      // .setTranslationKey('')
      .setVisible(true)
    this.peopleCount3 = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-3'))
      // .setTranslationKey('')
      .setVisible(true)
    this.peopleCount4 = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-4'))
      // .setTranslationKey('')
      .setVisible(true)
    this.peopleCount5 = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-5'))
      // .setTranslationKey('')
      .setVisible(true)
    this.peopleCount6 = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-6'))
      // .setTranslationKey('')
      .setVisible(true)
    this.peopleCountMore = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('peopleCount-7'))
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
    await this.step5Title.validateSelf()
    await this.step5Subtitle.validateSelf()
    await this.peopleCount1.validateSelf()
    await this.peopleCount2.validateSelf()
    await this.peopleCount3.validateSelf()
    await this.peopleCount4.validateSelf()
    await this.peopleCount5.validateSelf()
    await this.peopleCount6.validateSelf()
    await this.peopleCountMore.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectPeopleCount() {
    let peopleCountBtns = [
      this.peopleCount1,
      this.peopleCount2,
      this.peopleCount3,
      this.peopleCount4,
      this.peopleCount5,
      this.peopleCount6,
      this.peopleCountMore,
    ]
    let peopleCountBtn = this._getRandom(peopleCountBtns)
    console.log(`People count in test: ${await peopleCountBtn.readElementText()}`)
    await peopleCountBtn.click()
    await peopleCountBtn.waitToDisappear()
  }

  private _getRandom(data: ButtonInterface[]) {
    let min = 1
    let max = data.length - 1
    let i = Math.floor(Math.random() * (max - min + 1)) + min
    return data[i]
  }
}
