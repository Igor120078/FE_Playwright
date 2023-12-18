/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageWhyWoltairPOM extends POM {
  private whyWoltairTitle: LabelInterface
  private whyWoltairSubtitle: LabelInterface
  private reason0Title: LabelInterface
  private reason0Subtitle: LabelInterface
  private reason1Title: LabelInterface
  private reason1Subtitle: LabelInterface
  private reason2Title: LabelInterface
  private reason2Subtitle: LabelInterface
  private reason3Title: LabelInterface
  private reason3Subtitle: LabelInterface
  private reason4Title: LabelInterface
  private reason4Subtitle: LabelInterface
  private offerNote1: LabelInterface
  private offerNote2: LabelInterface

  constructor(page: Page) {
    super(page)

    this.whyWoltairTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.title'"))
      .setVisible(true)
    this.whyWoltairSubtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.subtitle'"))
      .setVisible(true)
    this.reason0Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.0.title'"))
      .setVisible(true)
    this.reason0Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.0.subtitle'"))
      .setVisible(true)
    this.reason1Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.1.title'"))
      .setVisible(true)
    this.reason1Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.1.subtitle'"))
      .setVisible(true)
    this.reason2Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.2.title'"))
      .setVisible(true)
    this.reason2Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.2.subtitle'"))
      .setVisible(true)
    this.reason3Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.3.title'"))
      .setVisible(true)
    this.reason3Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.3.subtitle'"))
      .setVisible(true)
    this.reason4Title = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.4.title'"))
      .setVisible(true)
    this.reason4Subtitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='whyWoltair.HVAC.reasons.4.subtitle'"))
      .setVisible(true)
    this.offerNote1 = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='* web.offer.note.1'"))
      .setVisible(true)
    this.offerNote2 = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("text='** web.offer.note.2'"))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl =
      PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/tepelna-cerpadla/kalkulacka/?translationsShowKeys'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.whyWoltairTitle.validateSelf()
    await this.whyWoltairSubtitle.validateSelf()
    await this.reason0Title.validateSelf()
    await this.reason0Subtitle.validateSelf()
    await this.reason1Title.validateSelf()
    await this.reason1Subtitle.validateSelf()
    await this.reason2Title.validateSelf()
    await this.reason2Subtitle.validateSelf()
    await this.reason3Title.validateSelf()
    await this.reason3Subtitle.validateSelf()
    await this.reason4Title.validateSelf()
    await this.reason4Subtitle.validateSelf()
    await this.offerNote1.validateSelf()
    await this.offerNote2.validateSelf()
  }
}
