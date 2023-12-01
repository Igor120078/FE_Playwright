import { expect } from '@playwright/test'
import { InputInterface } from '../../interfaces/inputInterface.js'
import { CommonComponent } from '../commonComponent.js'

export abstract class CommonInput<C extends CommonInput<C>> extends CommonComponent<C> implements InputInterface {
  protected inputText: string = ''
  protected placeholder: string = ''

  abstract newInstance(): InputInterface

  setPlaceholder(placeholder: string): InputInterface {
    this.placeholder = placeholder
    return this
  }

  setInputText(inputText: string): InputInterface {
    this.inputText = inputText
    return this
  }

  async sendTextToInput(inputText: string): Promise<InputInterface> {
    await this.locator.fill(inputText)
    this.inputText = inputText
    return this
  }

  async validateText(): Promise<void> {
    await expect(
      this.locator.getAttribute('placeholder'),
      this.stateValidationFailedMsg + 'Expected placeholder content: ' + this.placeholder
    ).toEqual(this.placeholder)
    await expect(this.locator, this.stateValidationFailedMsg + 'Expected text content: ' + this.inputText).toHaveText(
      this.inputText
    )
  }
}
