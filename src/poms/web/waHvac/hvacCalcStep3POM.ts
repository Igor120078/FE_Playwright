/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test'
// import { personsCountEnum } from './enums/personsCountEnum'

export class HvacCalcStep3POM {
  private page: Page
  private hvacCalcMetaTitle: Locator
  private step3Title: Locator
  private step3Subtitle: Locator
  private peopleCount1: Locator
  private peopleCount2: Locator
  private peopleCount3: Locator
  private peopleCount4: Locator
  private peopleCount5: Locator
  private peopleCount6: Locator
  private peopleCountMore: Locator
  private arrowBack: Locator
  private callMeInfo: Locator
  private callMeBtn: Locator

  constructor(page: Page) {
    this.page = page

    this.hvacCalcMetaTitle = page.getByText('web.meta.PRODUCTS.HEAT_PUMP.KALKULACKA.meta.title', { exact: true })
    this.step3Title = page.getByText('Pro kolik osob chcete ohřívat teplou vodu?', { exact: true })
    this.step3Subtitle = page.getByText(
      'Každý člověk zvyšuje spotřebu energie, je proto důležité zohlednit počet osob trvale žijících v domácnosti.'
    )
    this.peopleCount1 = page.getByTestId('peopleCount-1')
    this.peopleCount2 = page.getByTestId('peopleCount-2')
    this.peopleCount3 = page.getByTestId('peopleCount-3')
    this.peopleCount4 = page.getByTestId('peopleCount-4')
    this.peopleCount5 = page.getByTestId('peopleCount-5')
    this.peopleCount6 = page.getByTestId('peopleCount-6')
    this.peopleCountMore = page.getByTestId('peopleCount-more')
    this.arrowBack = page.locator("img[alt='Šipka zpět']")

    this.callMeInfo = page.locator("text='woltadvisor.leaveUsNumber'")
    this.callMeBtn = page.locator("text='woltadvisor.callMe'")
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await expect(this.hvacCalcMetaTitle).toBeVisible()
    await expect(this.step3Title).toBeVisible()
    await expect(this.step3Subtitle).toBeVisible()
    await expect(this.peopleCount1).toBeVisible()
    await expect(this.peopleCount2).toBeVisible()
    await expect(this.peopleCount3).toBeVisible()
    await expect(this.peopleCount4).toBeVisible()
    await expect(this.peopleCount5).toBeVisible()
    await expect(this.peopleCount6).toBeVisible()
    await expect(this.peopleCountMore).toBeVisible()
    await expect(this.arrowBack).toBeVisible()
    await expect(this.callMeInfo).toBeVisible()
    await expect(this.callMeBtn).toBeVisible()
  }

  async selectPeopleCount() {
    let peopleCountBtns = [
      this.peopleCount1,
      this.peopleCount2,
      this.peopleCount3,
      this.peopleCount4,
      this.peopleCount5,
      this.peopleCount6,
      this.peopleCountMore,
    ]

    let peopleCountBtn = this._getRandom(peopleCountBtns)
    console.log(`People count in test: ${await peopleCountBtn.allInnerTexts()}`)
    await peopleCountBtn.click()
    await expect(peopleCountBtn).not.toBeVisible({ timeout: 5000 })
  }

  private _getRandom(data: Locator[]) {
    let i = Math.floor(Math.random() * data.length)
    return data[i]
  }
}
