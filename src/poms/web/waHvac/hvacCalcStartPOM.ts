/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

export class HvacCalcStartPOM {
  readonly page: Page
  private hvacCalcStartTitle: Locator
  private hvacCalcBtnImg: Locator
  private hvacCalcBtn: Locator
  private hvacCalcStartInfo: Locator

  constructor(page: Page) {
    this.page = page

    this.hvacCalcStartTitle = page.getByText('web.woltadvisor.router.title', { exact: true })
    this.hvacCalcBtnImg = page.locator("img[alt='web.woltadvisor.imageAlt.heatPump']")
    this.hvacCalcBtn = page.getByText('web.woltadvisor.index.hvac', { exact: true })
    this.hvacCalcStartInfo = page.getByText('web.woltadvisor.index.info', { exact: true })
  }

  async navigate(): Promise<void> {
    const testUrl = `${process.env.PLAYWRIGHT_BASE_URL_CZ}/?translationsShowKeys`
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await expect(this.hvacCalcStartTitle).toBeVisible()
    await expect(this.hvacCalcBtnImg).toBeVisible()
    await expect(this.hvacCalcBtn).toBeVisible()
    await expect(this.hvacCalcStartInfo).toBeVisible()
  }

  async selectHvac() {
    await this.hvacCalcBtn.click()
  }
}
