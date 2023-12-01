import { test } from '../../../src/fixtures/customFixtures.js'

test('Context using proxy', async ({ context }) => {
  const page = await context.newPage()
  page.goto('https://www.google.com')
  await delay(5000)
})

test('Page using proxy', async ({ page }) => {
  await page.goto('https://www.google.com')
  await delay(5000)
})

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
