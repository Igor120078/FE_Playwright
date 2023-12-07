/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class CallMeBackStep3POM extends POM {
  private thankMessage: LabelInterface

  constructor(page: Page) {
    super(page)

    this.thankMessage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='web.forms.leaveContact.thankYou'"))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('WEB_BASE_URL_CZ') + '/fotovoltaika/zanechejte-kontakt'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.thankMessage.waitToAppear(5000)
    await this.thankMessage.validateSelf()
  }
}
