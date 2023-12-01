import { CommonInput } from './commonInput.js'

export class IntegerInput extends CommonInput<IntegerInput> {
  constructor() {
    super()
  }

  public newInstance(): IntegerInput {
    return new IntegerInput()
  }

  async sendTextToInput(inputText: string): Promise<IntegerInput> {
    await this.locator.fill(inputText)
    if (!+inputText) this.inputText = ''
    else this.inputText = inputText
    return this
  }
}
