/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageSeasonCoverageOptimumPOM extends POM {
  private seasonCoverage: LabelInterface
  private winterCoverage: LabelInterface
  private springCoverage: LabelInterface
  private summerCoverage: LabelInterface
  private autumnCoverage: LabelInterface
  private optimumCoverage: LabelInterface

  private optimumWinterCoverageValue: LabelInterface
  private optimumSpringCoverageValue: LabelInterface
  private optimumSummerCoverageValue: LabelInterface
  private optimumAutumnCoverageValue: LabelInterface

  private graphSeasonCoverage: LabelInterface

  constructor(page: Page) {
    super(page)

    this.seasonCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.offer.photovoltaics.seasonCoverage', { exact: true }))
      .setVisible(true)
    this.winterCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.global.winter', { exact: true }))
      .setVisible(true)
    this.springCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.global.spring', { exact: true }))
      .setVisible(true)
    this.summerCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.global.summer', { exact: true }))
      .setVisible(true)
    this.autumnCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.global.autumn', { exact: true }))
      .setVisible(true)
    this.optimumCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('FVE_OFFER_TYPE.OPTIMUM', { exact: true }).nth(0))
      .setVisible(true)

    this.optimumWinterCoverageValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("(//div[text()='FVE_OFFER_TYPE.OPTIMUM']/following-sibling::div)[1]"))
      .setVisible(true)
    this.optimumSpringCoverageValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("(//div[text()='FVE_OFFER_TYPE.OPTIMUM']/following-sibling::div)[2]"))
      .setVisible(true)
    this.optimumSummerCoverageValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("(//div[text()='FVE_OFFER_TYPE.OPTIMUM']/following-sibling::div)[3]"))
      .setVisible(true)
    this.optimumAutumnCoverageValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("(//div[text()='FVE_OFFER_TYPE.OPTIMUM']/following-sibling::div)[4]"))
      .setVisible(true)

    this.graphSeasonCoverage = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator('(//canvas)[1]'))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = 'https://cz.staging.woltair.dev/fotovoltaika/nabidka?leadUid=c6c82e53-6235-4efc-8acb-58fbc0ef480e'
    //PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async waitForOfferPage() {
    await this.seasonCoverage.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.seasonCoverage.validateSelf()
    await this.winterCoverage.validateSelf()
    await this.springCoverage.validateSelf()
    await this.summerCoverage.validateSelf()
    await this.autumnCoverage.validateSelf()
    await this.optimumCoverage.validateSelf()
    await this.optimumWinterCoverageValue.validateSelf()
    await this.optimumSpringCoverageValue.validateSelf()
    await this.optimumSummerCoverageValue.validateSelf()
    await this.optimumAutumnCoverageValue.validateSelf()
    await this.graphSeasonCoverage.validateSelf()
  }

  async validateSeasonCoverageValues() {
    let optimumWinter = Number((await this.optimumWinterCoverageValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Optimum Winter coverage: ${optimumWinter}%`)
    expect(optimumWinter).toBeGreaterThan(1)
    let optimumSpring = Number((await this.optimumSpringCoverageValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Optimum Spring coverage: ${optimumSpring}%`)
    expect(optimumSpring).toBeGreaterThan(1)
    let optimumSummer = Number((await this.optimumSummerCoverageValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Optimum Summer coverage: ${optimumSummer}%`)
    expect(optimumSummer).toBeGreaterThan(1)
    let optimumAutumn = Number((await this.optimumAutumnCoverageValue.readElementText()).replace(/\D+/g, ''))
    console.log(`Optimum Autumn coverage: ${optimumAutumn}%`)
    expect(optimumAutumn).toBeGreaterThan(1)
  }
}
