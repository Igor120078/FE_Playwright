import { test } from '@playwright/test'
import { InverseError } from '../../../src/errors/inverseError.js'
import { AuthFactory, ComponentFactory } from '../../../src'
import { ComboboxInterface } from '../../../src/components/interfaces/comboboxInterface'
import { SuperfixWebAuthIdentifierOptions } from '../../../src/authProvider/types/superfixWebAuthOptions'

test('Combobox example - multiselect', async ({ page }) => {
  await AuthFactory.createWarehouseWebAuth(page).setUserIdentifier('automationuser@woltair.cz').authenticate()

  await page.locator("//*[@href='/users']").waitFor()
  await page.locator("//*[@href='/users']").click()
  await page.locator("//*[text()='whouseAdmin.addUser']").waitFor()
  await page.locator("//*[text()='whouseAdmin.addUser']").click()
  const combobox: ComboboxInterface = ComponentFactory.createCombobox()
    .whMultiselectCombobox()
    .setLocator(page.locator("//*[contains(@class,'svelecte')]"))
    .setSelectedValue('ADMIN')
  await combobox.selectNthOption(0)
  await combobox.selectOption('SUPERADMIN')
  await combobox.validateSelf()
  await combobox.selectOption('CLIENT_MANAGER')
  await combobox.validateSelf()
  await combobox.deselectOption('CLIENT_MANAGER')
  await combobox.validateSelf()
  combobox.setSelectedValue('AAA')
  try {
    await combobox.validateSelf()
    throw new InverseError('Validation passed when it was expected to fail!')
  } catch (e) {
    if (e instanceof InverseError) {
      throw Error('Combobox failed to validate expected value against actual combobox value!.')
    }
  }
})

test('Combobox example - multiselect combobox', async ({ page }) => {
  await AuthFactory.createSuperfixWebAuth(page)
    .setIdentifierOption(SuperfixWebAuthIdentifierOptions.EMAIL)
    .setUserIdentifier('pavel.matuska@woltair.cz')
    .authenticate()

  await page.locator("//*[@href='/users']").waitFor({ timeout: 10000 })
  await page.locator("//*[@href='/users']").click()
  await page.locator("//*[@href='/users/add']").waitFor({ timeout: 10000 })
  await page.locator("//*[@href='/users/add']").click()
  await page.locator("//div[contains(@class,'heading-container')]//h4[contains(text(),'users.addNew')]").waitFor()

  const comboboxExample: ComboboxInterface = ComponentFactory.createCombobox()
    .wuiSimpleMultiselectCombobox()
    .setLocator(page.locator("//div[contains(@class,'select')]").nth(1))
  //combobox has a bug where it does not load options - must be clicked manually once first
  await new Promise(resolve => setTimeout(resolve, 5000))
  await comboboxExample.selectNthOption(1)
  await comboboxExample.validateSelf()
  await comboboxExample.selectOption('Má smlouvu')
  await comboboxExample.validateSelf()
  await comboboxExample.selectNthOption(0)
  await comboboxExample.validateSelf()
  await comboboxExample.deselectOption('Má smlouvu')
  await comboboxExample.validateSelf()
  comboboxExample.setSelectedValue('AAA')
  try {
    await comboboxExample.validateSelf()
    throw new InverseError('Validation passed when it was expected to fail!')
  } catch (e) {
    if (e instanceof InverseError) {
      throw Error('Combobox failed to validate expected value against actual combobox value!.')
    }
  }
})

test('Combobox example - warehouse singleselect combobox', async ({ page }) => {
  await AuthFactory.createWarehouseAuth(page).authenticate()

  await page.locator("//*[@href='/clients']").waitFor()
  await page.locator("//*[@href='/clients']").click()
  await page.locator("//div[contains(@class,'page-header')]//button").waitFor()
  await page.locator("//div[contains(@class,'page-header')]//button").click()
  const comboboxExample: ComboboxInterface = ComponentFactory.createCombobox()
    .wuiSingleSelectCombobox()
    .setLocator(
      page.locator(
        "//*[text()='whouseAdmin.currencyCode']/ancestor::div[contains(@class,'select')]//div[@class='dropdown']"
      )
    )
  await comboboxExample.waitToAppear()
  await comboboxExample.selectNthOption(1)
  await comboboxExample.validateSelf()
  await comboboxExample.selectOption('CZK')
  await comboboxExample.validateSelf()
  await comboboxExample.selectNthOption(0)
  await comboboxExample.validateSelf()
  comboboxExample.setSelectedValue('AAA')
  try {
    await comboboxExample.validateSelf()
    throw new InverseError('Validation passed when it was expected to fail!')
  } catch (e) {
    if (e instanceof InverseError) {
      throw Error('Combobox failed to validate expected value against actual combobox value!.')
    }
  }
})
