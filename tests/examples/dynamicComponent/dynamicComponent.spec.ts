import { Page, test } from '@playwright/test'

import { ComponentFactory } from '../../../src/components/factory/componentFactory'
import { ButtonInterface } from '../../../src/components/interfaces/buttonInterface'
import { CounterConditions } from '../../../src/components/types/counterConditions'
import { DynamicComponentInterface } from '../../../src/components/interfaces/dynamicComponentInterface'

test('Example: Go to woltair web and click one-by-one on all links(CZ areas) and return back to main page', async ({
  page,
}) => {
  await page.goto('http://www.woltair.cz')

  /**
   * Declare button with dynamic locator, which targets multiple items of same type.
   */
  const dynamicButton: ButtonInterface = ComponentFactory.createButton()
    .button()
    .setLocator(
      page.locator(
        "//section//h2[text()='web.references.REFERENCES_BLOCK.heading']/parent::section//div[@class='block']//div[contains(@class,'flex item')]"
      )
    )
  const dynamicComponent = ComponentFactory.createDynamicComponent()
    .defaultDynamicComponent<ButtonInterface>()
    .setComponent(dynamicButton)

  /**
   * Wait for at least 5 instances of specified button locator to appear and
   * print the count into console log
   */
  await dynamicComponent.waitForCount(CounterConditions.MORE_THAN, 5)
  console.log(await dynamicComponent.count())

  /**
   * Read all occurences of given element and return array with locators for each element
   */
  const arrayOfButton: ButtonInterface[] = await dynamicComponent.readAll()

  /**
   * For all identified elements, click on link one-by-one, and each time return back to original page
   */
  for (const button of arrayOfButton) {
    await clickOnLinkAndGoBack(button, dynamicComponent, page)
  }
})

async function clickOnLinkAndGoBack(
  button: ButtonInterface,
  dynamicComponent: DynamicComponentInterface<ButtonInterface>,
  page: Page
) {
  console.log(await button.readElementText())
  console.log(button.getLocator())
  await button.click()
  await dynamicComponent.waitForCount(CounterConditions.EXACT, 0)
  await page.goBack()
  await dynamicComponent.waitForCount(CounterConditions.MORE_THAN, 1)
}
