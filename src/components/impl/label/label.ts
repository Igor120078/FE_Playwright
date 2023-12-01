import { expect } from '@playwright/test'
import { CommonComponent } from '../commonComponent.js'
import { LabelInterface } from '../../interfaces/labelInterface.js'

export class Label extends CommonComponent<Label> implements LabelInterface {
  private labelText: string = ''

  constructor() {
    super()
  }

  public newInstance(): Label {
    return new Label()
  }

  setLabelText(labelText: string): Label {
    this.labelText = labelText
    return this
  }

  async validateText() {
    await expect(this.locator, this.stateValidationFailedMsg + 'Expected text content: ' + this.labelText).toHaveText(
      this.labelText
    )
  }
}
