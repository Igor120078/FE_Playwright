/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStartPOM extends POM {
  private fveCalcStartTitle: LabelInterface
  private fveCalcBtnImg: LabelInterface
  private fveCalcBtn: ButtonInterface
  private calcStartInfo: LabelInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcStartTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.woltadvisor.router.title'))
      .setVisible(true)
    this.fveCalcBtnImg = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("img[alt='web.woltadvisor.imageAlt.panel']"))
      .setVisible(true)
    this.fveCalcBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('web.woltadvisor.index.pv'))
      .setTranslationKey('web.woltadvisor.index.pv')
      .setVisible(true)
    this.calcStartInfo = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.woltadvisor.index.info'))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/kalkulacka/?translationsShowKeys'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.fveCalcStartTitle.validateSelf()
    await this.fveCalcBtnImg.validateSelf()
    await this.fveCalcBtn.validateSelf()
    await this.calcStartInfo.validateSelf()
  }

  async selectFve() {
    await this.fveCalcBtn.click()
    await this.fveCalcStartTitle.waitToDisappear()
  }
}
