/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep2cPOM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private step2cTitle: LabelInterface
  private step2cSubtitle: LabelInterface
  private isoLevelHighBtn: ButtonInterface
  private isoLevelMediumBtn: ButtonInterface
  private isoLevelLowBtn: ButtonInterface
  private isoLevelNoneBtn: ButtonInterface
  private arrowBack: ButtonInterface
  private callMeInfo: LabelInterface
  private callMeBtn: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.step2cTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Jakou máte míru zateplení domu?')) // should be translation key
    this.step2cSubtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(
        this.page.locator("//*[contains(text(),'Na základě tohoto údaje jsme schopni odhadnout tepelnou ztrátu')]")
      )
      .setVisible(true)
    this.isoLevelHighBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-high'))
      // .setTranslationKey('')
      .setVisible(true)
    this.isoLevelMediumBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-medium'))
      // .setTranslationKey('')
      .setVisible(true)
    this.isoLevelLowBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-low'))
      // .setTranslationKey('')
      .setVisible(true)
    this.isoLevelNoneBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('isoLevel-none'))
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
    await this.step2cTitle.validateSelf()
    await this.step2cSubtitle.validateSelf()
    await this.isoLevelHighBtn.validateSelf()
    await this.isoLevelMediumBtn.validateSelf()
    await this.isoLevelLowBtn.validateSelf()
    await this.isoLevelNoneBtn.validateSelf()
    await this.arrowBack.validateSelf()
    await this.callMeInfo.validateSelf()
    await this.callMeBtn.validateSelf()
  }

  async selectIsoLevelHigh() {
    await this.isoLevelHighBtn.click()
    await this.isoLevelHighBtn.waitToDisappear()
  }
}
