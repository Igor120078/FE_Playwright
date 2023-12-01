import { Locator, expect } from '@playwright/test'

export abstract class CommonComponent<C extends CommonComponent<C>> {
  protected locator!: Locator
  protected translationKey: string = ''
  protected timeout?: number
  protected visible?: boolean
  protected enabled?: boolean
  protected readonly?: boolean
  protected stateValidationFailedMsg: string = 'Validation of component state failed! '

  protected constructor() {}

  /**
   * Ensures callback from parent class to subclass which instantiated current object.
   * @returns Returns sub-class that instantiated object
   */
  protected child(): C {
    return this as any
  }

  async readElementText(): Promise<string> {
    return (await this.locator.allInnerTexts()) + ''
  }

  setLocator(locator: Locator): C {
    this.locator = locator
    return this.child()
  }

  getLocator(): Locator {
    return this.locator
  }

  setTimeout(timeout: number): C {
    this.timeout = timeout
    return this.child()
  }

  setVisible(visible: boolean): C {
    this.visible = visible
    return this.child()
  }

  setEnabled(enabled: boolean): C {
    this.enabled = enabled
    return this.child()
  }

  setReadonly(readonly: boolean): C {
    this.readonly = readonly
    return this.child()
  }

  setTranslationKey(translationKey: string): C {
    this.translationKey = translationKey
    return this.child()
  }

  async waitToAppear(optionalTimeout?: number, state?: string) {
    await this.locator.waitFor(this.buildProperties(optionalTimeout, state))
    return this.child()
  }

  async waitToDisappear(optionalTimeout?: number) {
    await expect(
      this.locator,
      this.stateValidationFailedMsg + 'Element did not dissapear within timeout.'
    ).not.toBeVisible(this.buildProperties(optionalTimeout))
    return this.child()
  }

  async validateVisible(): Promise<boolean> {
    if (this.visible === undefined) throw Error(this.stateValidationFailedMsg + "'Visibility' is not defined!")
    return (await this.locator.isVisible()) === this.visible
  }

  async validateEnabled(): Promise<boolean> {
    if (this.enabled === undefined) throw Error(this.stateValidationFailedMsg + "'Enabled' is not defined!")
    return (await this.locator.isEnabled()) === this.enabled
  }

  async validateReadonly(): Promise<boolean> {
    if (this.readonly === undefined) throw Error(this.stateValidationFailedMsg + "'Readonly' is not defined!")
    return (await this.locator.isEditable()) !== this.readonly
  }

  validateText(): Promise<void> {
    throw Error('Text validation is not yet defined for elements in Woltair QA framework.')
  }

  async validateSelf(timeoutOverride?: number): Promise<void> {
    if (this.visible === true) {
      await this.waitToAppear(timeoutOverride)
      expect(
        await this.validateVisible(),
        this.stateValidationFailedMsg + "Expected 'visible' state: " + this.visible
      ).toBeTruthy()
      if (this.enabled !== undefined)
        expect(
          await this.validateEnabled(),
          this.stateValidationFailedMsg + "Expected 'enabled' state: " + this.enabled
        ).toBeTruthy()
      if (this.readonly !== undefined)
        expect(
          await this.validateReadonly(),
          this.stateValidationFailedMsg + "Expected 'readonly' state: " + this.readonly
        ).toBeTruthy()
    }
    if (this.visible === false) {
      await this.waitToDisappear(timeoutOverride)
      expect(
        await this.validateVisible(),
        this.stateValidationFailedMsg + "Expected 'visible' state: " + this.visible
      ).toBeTruthy()
    }
  }

  private buildProperties(optionalTimeout?: number, state?: string): {} {
    var properties: { [k: string]: any } = {}
    if (optionalTimeout !== undefined) properties.timeout = optionalTimeout
    else if (this.timeout !== undefined) properties.timeout = this.timeout
    if (state !== undefined) properties.state = state
    return properties
  }
}
