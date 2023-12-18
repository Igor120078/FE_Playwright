/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
import { IsoLevels } from './enums/isoLevelsEnum'

export class HvacCalcStep5bPOM extends POM {
  // HomePage
  private hvacCalcMetaTitle: LabelInterface
  private step5bTitle: LabelInterface
  private step5bSubtitle: LabelInterface
  private isoLevelHigh: ButtonInterface
  private isoLevelMedium: ButtonInterface
  private isoLevelLow: ButtonInterface
  private isoLevelNone: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.hvacCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'"))
      .setVisible(true)
    this.step5bTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='Jakou máte míru zateplení domu?'")) // should be translation key
    this.step5bSubtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("text='Na základě tohoto údaje jsme schopni odhadnout tepelnou ztrátu Vaší nemovitosti.'")
      )
      .setVisible(true)
    this.isoLevelHigh = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-high'))
      // .setTranslationKey('Vysokou')
      .setVisible(true)
    this.isoLevelMedium = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-medium'))
      // .setTranslationKey('Střední')
      .setVisible(true)
    this.isoLevelLow = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-low'))
      // .setTranslationKey('Nízkou')
      .setVisible(true)
    this.isoLevelNone = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-none'))
      // .setTranslationKey('Žádnou')
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
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka?krok=4.5b'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.hvacCalcMetaTitle.validateSelf()
    await this.step5bTitle.validateSelf()
    await this.step5bSubtitle.validateSelf()
    await this.isoLevelHigh.validateSelf()
    await this.isoLevelMedium.validateSelf()
    await this.isoLevelLow.validateSelf()
    await this.isoLevelNone.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectIsoLevel(isoLevel: IsoLevels) {
    switch (isoLevel) {
      case IsoLevels.HIGH:
        await this.isoLevelHigh.click()
        break
      case IsoLevels.MEDIUM:
        await this.isoLevelMedium.click()
        break
      case IsoLevels.LOW:
        await this.isoLevelLow.click()
        break
      case IsoLevels.NONE:
        await this.isoLevelNone.click()
        break
      default:
        throw Error(`This isolation level: ${isoLevel} is not defined in IsoLevels yet`)
    }
  }
}
