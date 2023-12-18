/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test'
import { WaterHeating } from './enums/waterHeatingEnum'

export class HvacCalcStep2POM {
  private page: Page
  private hvacCalcMetaTitle: Locator
  private waterHeatingElectro: Locator
  private waterHeatingHeatingSource: Locator
  private waterHeatingOther: Locator
  private arrowBack: Locator
  private callMeInfo: Locator
  private callMeBtn: Locator

  constructor(page: Page) {
    this.page = page

    this.hvacCalcMetaTitle = page.locator("text='web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title'")
    this.waterHeatingElectro = page.getByTestId('waterHeating-electricBoiler')
    this.waterHeatingHeatingSource = page.getByTestId('waterHeating-heatingSource')
    this.waterHeatingOther = page.getByTestId('waterHeating-other')
    this.arrowBack = page.locator("img[alt='Šipka zpět']")
    this.callMeInfo = page.locator("text='woltadvisor.leaveUsNumber'")
    this.callMeBtn = page.locator("text='woltadvisor.callMe'")
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await expect(this.hvacCalcMetaTitle).toBeVisible()
    await expect(this.waterHeatingElectro).toBeVisible()
    await expect(this.waterHeatingHeatingSource).toBeVisible()
    await expect(this.waterHeatingOther).toBeVisible()
    await expect(this.arrowBack).toBeVisible()
    await expect(this.callMeInfo).toBeVisible()
    await expect(this.callMeBtn).toBeVisible()
  }

  async selectElectricBoiler() {
    await this.waterHeatingElectro.click()
    // await expect(this.waterHeatingElectro).not.toBeVisible({ timeout: 5000 })
  }

  async selectWaterHeatingSource(heatSource: WaterHeating) {
    switch (heatSource) {
      case WaterHeating.ELECTRO:
        await this.waterHeatingElectro.click()
        break
      case WaterHeating.HEATING_SOURCE:
        await this.waterHeatingHeatingSource.click()
        break
      case WaterHeating.OTHER:
        await this.waterHeatingOther.click()
        break
      default:
        throw Error(`This water heating source: ${heatSource} is not defined in WaterHeating yet`)
    }
  }
}
