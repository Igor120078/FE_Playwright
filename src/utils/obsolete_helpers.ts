import { Page } from '@playwright/test'

export async function timeout(time = 1000) {
  return new Promise(r => setTimeout(r, time))
}

export async function waitPage(testPage: Page, timeoutDelay = 0) {
  await testPage.waitForLoadState('domcontentloaded')
  await testPage.waitForLoadState('load')
  await testPage.waitForLoadState('networkidle')
  if (timeoutDelay) {
    await timeout(timeoutDelay)
  }
}

export async function phoneNumber() {
  return Math.floor(Math.random() * 900000 + 100000)
}
