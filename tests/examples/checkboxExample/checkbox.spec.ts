import { test } from '@playwright/test'
import { CheckboxInterface } from '../../../src/components/interfaces/checkboxInterface'
import { AuthFactory, ComponentFactory } from '../../../src'

test('Radio group option example', async ({ page }) => {
  await AuthFactory.createSuperfixAuth(page).authenticate()
  await page.goto('https://www.dev.superfix.dev/tags/new')
  const checkboxExample: CheckboxInterface = ComponentFactory.createCheckbox()
    .wuiCheckbox()
    .setVisible(true)
    .setChecked(false)
    .setLocator(page.getByTestId('form-isProtected-switch'))

  //this.page.getByTestId('form-isProtected-switch-label')

  await checkboxExample.waitToAppear()
  await checkboxExample.check()
  await checkboxExample.validateSelf()
})
