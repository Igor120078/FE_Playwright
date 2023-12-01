import { Page } from '@playwright/test'
import { CommonComponent } from '../components/impl/commonComponent.js'

export abstract class POM {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  public abstract navigate(): Promise<void>

  public abstract goBack(): Promise<void>

  public async goForward(): Promise<void> {
    this.page.goForward()
  }

  public async validateAllComponents(timeoutOverride?: number): Promise<void> {
    for (const itemName of Reflect.ownKeys(this)) {
      const property = Reflect.get(this, itemName)
      if (property instanceof CommonComponent) {
        try {
          await property.validateSelf(timeoutOverride)
        } catch (e) {
          console.log('Unable to validate element: ' + itemName.toString())
          throw e
        }
      }
    }
  }
}
