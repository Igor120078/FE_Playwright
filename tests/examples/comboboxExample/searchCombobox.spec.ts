import { test } from '@playwright/test'
import { AuthFactory, ComponentFactory } from '../../../src'
import { ComboboxInterface } from '../../../src/components/interfaces/comboboxInterface'
import { SuperfixWebAuthIdentifierOptions } from '../../../src/authProvider/types/superfixWebAuthOptions'
import { InverseError } from '../../../src/errors/inverseError'

test('Combobox example - multiselect combobox', async ({ page }) => {
  await AuthFactory.createSuperfixWebAuth(page)
    .setIdentifierOption(SuperfixWebAuthIdentifierOptions.EMAIL)
    .setUserIdentifier('marat.sanzhar@woltair.cz')
    .authenticate()

  await page.locator("//*[@href='/users']").waitFor({ timeout: 10000 })
  await page.locator("//*[@href='/users']").click()

  const comboboxExample: ComboboxInterface = await ComponentFactory.createCombobox()
    .superfixSearchCombobox()
    .setLocator(await page.locator("//div[contains(@class,'select')]").nth(0))
  comboboxExample.waitToAppear()
  await new Promise(resolve => setTimeout(resolve, 5000))
  await comboboxExample.selectOption('Marat Sanzhar')
  await new Promise(resolve => setTimeout(resolve, 5000))
  await page.goBack()
  await new Promise(resolve => setTimeout(resolve, 5000))
  await page.locator("//*[@href='/users']").waitFor({ timeout: 10000 })
  await page.locator("//*[@href='/users']").click()
  await comboboxExample.validateSelf()
  try {
    await comboboxExample.selectNthOption(6557)
    throw new InverseError('Validation passed when it was expected to fail!')
  } catch (e) {
    if (e instanceof InverseError) {
      throw Error('Combobox failed to validate expected value against actual combobox value!.')
    }
  }
  try {
    await comboboxExample.deselectOption('')
    throw new InverseError('Validation passed when it was expected to fail!')
  } catch (e) {
    if (e instanceof InverseError) {
      throw Error('Combobox failed to validate expected value against actual combobox value!.')
    }
  }
})
