import { expect } from '@playwright/test'
import { CheckboxInterface } from '../../interfaces/checkboxInterface.js'
import { CommonCheckbox } from './commonCheckbox.js'
import { Retry } from '../../../utils/retry/retry.js'

export class WuiCheckbox extends CommonCheckbox<WuiCheckbox> implements CheckboxInterface {
  constructor() {
    super()
  }

  public newInstance(): WuiCheckbox {
    return new WuiCheckbox()
  }

  async check(): Promise<CheckboxInterface> {
    if (!(await this.readCurrentStateOfCheck())) await this.locator.locator('//button').click()
    this.isChecked = true
    await Retry.run(
      (await this.readCurrentStateOfCheck()) == this.isChecked,
      'Checkbox did not become checked after check action was performed!'
    )
    return this
  }

  async uncheck(): Promise<CheckboxInterface> {
    if (await this.readCurrentStateOfCheck()) await this.locator.locator('//button').click()
    this.isChecked = false
    await Retry.run(
      (await this.readCurrentStateOfCheck()) === this.isChecked,
      'Checkbox did not become unchecked after uncheck action was performed!'
    )
    return this
  }

  async validateSelf(): Promise<void> {
    await super.validateSelf()
    expect(
      (await this.readCurrentStateOfCheck()) === this.isChecked,
      this.stateValidationFailedMsg + "Expected 'checked' state: " + this.isChecked
    ).toBeTruthy()
  }

  private async readCurrentStateOfCheck(): Promise<boolean> {
    const checkboxClass: string | null = await this.locator.getAttribute('class')
    if (checkboxClass === undefined || checkboxClass === null)
      throw Error('Unable to read class of select by locator: ' + this.locator)
    return checkboxClass.includes('checked')
  }
}
