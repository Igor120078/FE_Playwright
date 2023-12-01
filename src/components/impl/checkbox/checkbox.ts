import { expect } from '@playwright/test'
import { CheckboxInterface } from '../../interfaces/checkboxInterface.js'
import { CommonCheckbox } from './commonCheckbox.js'

export class Checkbox extends CommonCheckbox<Checkbox> implements CheckboxInterface {
  constructor() {
    super()
  }

  public newInstance(): Checkbox {
    return new Checkbox()
  }

  async check(): Promise<CheckboxInterface> {
    await this.locator.check()
    this.isChecked = true
    return this
  }

  async uncheck(): Promise<CheckboxInterface> {
    await this.locator.uncheck()
    this.isChecked = false
    return this
  }

  async validateSelf(): Promise<void> {
    await super.validateSelf()
    expect(
      (await this.locator.isChecked()) === this.isChecked,
      this.stateValidationFailedMsg + "Expected 'checked' state: " + this.isChecked
    ).toBeTruthy()
  }
}
