/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test'
import { HeatSources } from './enums/heatSourceEnum'

export class HvacCalcStep1POM {
  private page: Page
  private hvacCalcMetaTitle: Locator
  private houseHeatingCoal: Locator
  private houseHeatingCoal1: Locator
  private houseHeatingCoalOther: Locator
  private houseHeatingElectro: Locator
  private houseHeatingGas: Locator
  private houseHeatingHeatpump: Locator
  private houseHeatingOther: Locator

  private callMeInfo: Locator
  private callMeBtn: Locator

  constructor(page: Page) {
    this.page = page

    this.hvacCalcMetaTitle = page.getByText('web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title', { exact: true })
    this.houseHeatingCoal = page.getByTestId('houseHeatType-coal')
    this.houseHeatingCoal1 = page.getByTestId('houseHeatType-coal_I_II')
    this.houseHeatingCoalOther = page.getByTestId('houseHeatType-coal-other')
    this.houseHeatingElectro = page.getByTestId('houseHeatType-electro')
    this.houseHeatingGas = page.getByTestId('houseHeatType-gas')
    this.houseHeatingHeatpump = page.getByTestId('houseHeatType-heatpump')
    this.houseHeatingOther = page.getByTestId('houseHeatType-other')

    this.callMeInfo = page.getByText('woltadvisor.leaveUsNumber', { exact: true })
    this.callMeBtn = page.getByText('woltadvisor.callMe', { exact: true })
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await expect(this.hvacCalcMetaTitle).toBeVisible({ timeout: 10000 })
    await expect(this.houseHeatingCoal).toBeVisible()
    await expect(this.houseHeatingCoal1).not.toBeVisible()
    await expect(this.houseHeatingCoalOther).not.toBeVisible()
    await expect(this.houseHeatingElectro).toBeVisible()
    await expect(this.houseHeatingGas).toBeVisible()
    await expect(this.houseHeatingHeatpump).toBeVisible()
    await expect(this.houseHeatingOther).toBeVisible()
    await expect(this.callMeInfo).toBeVisible()
    await expect(this.callMeBtn).toBeVisible()
  }

  async selectHeatSource(heatSource: HeatSources) {
    switch (heatSource) {
      case HeatSources.COAL:
        await this.houseHeatingCoal.click()
        break
      case HeatSources.COAL1_2:
        await this.houseHeatingCoal1.click()
        break
      case HeatSources.COAL_OTHER:
        await this.houseHeatingCoalOther.click()
        break
      case HeatSources.ELECTRO:
        await this.houseHeatingElectro.click()
        break
      case HeatSources.GAS:
        await this.houseHeatingGas.click()
        break
      case HeatSources.HEATPUMP:
        await this.houseHeatingHeatpump.click()
        break
      case HeatSources.OTHER:
        await this.houseHeatingCoalOther.click()
        break

      default:
        throw Error(`This heat type: ${heatSource} is not defined in HeatSources yet`)
    }
  }
}
