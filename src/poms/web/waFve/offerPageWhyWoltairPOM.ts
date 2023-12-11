/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class OfferPageWhyWoltairPOM extends POM {
  private whyWoltairTitle: LabelInterface
  private whyWoltairExpertTym: LabelInterface
  private whyWoltairExpertTymDesc: LabelInterface
  private whyWoltairGuarantee: LabelInterface
  private whyWoltairGuaranteeDesc: LabelInterface
  private whyWoltairInstallation: LabelInterface
  private whyWoltairInstallationDesc: LabelInterface
  private whyWoltairMonitoring: LabelInterface
  private whyWoltairMonitoringDesc: LabelInterface

  constructor(page: Page) {
    super(page)

    this.whyWoltairTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.title', { exact: true }))
      .setVisible(true)
    this.whyWoltairExpertTym = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.expertTeams', { exact: true }))
      .setVisible(true)
    this.whyWoltairExpertTymDesc = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.expertTeams.desc', { exact: true }))
      .setVisible(true)
    this.whyWoltairGuarantee = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.guarantee', { exact: true }))
      .setVisible(true)
    this.whyWoltairGuaranteeDesc = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.guarantee.desc', { exact: true }))
      .setVisible(true)
    this.whyWoltairInstallation = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.installation', { exact: true }))
      .setVisible(true)
    this.whyWoltairInstallationDesc = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.installation.desc', { exact: true }))
      .setVisible(true)
    this.whyWoltairMonitoring = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.monitoring', { exact: true }))
      .setVisible(true)
    this.whyWoltairMonitoringDesc = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('whyWoltair.monitoring.desc', { exact: true }))
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
    await this.whyWoltairTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.whyWoltairTitle.validateSelf()
    await this.whyWoltairExpertTym.validateSelf()
    await this.whyWoltairExpertTymDesc.validateSelf()
    await this.whyWoltairGuarantee.validateSelf()
    await this.whyWoltairGuaranteeDesc.validateSelf()
    await this.whyWoltairInstallation.validateSelf()
    await this.whyWoltairInstallationDesc.validateSelf()
    await this.whyWoltairMonitoring.validateSelf()
    await this.whyWoltairMonitoringDesc.validateSelf()
  }
}
