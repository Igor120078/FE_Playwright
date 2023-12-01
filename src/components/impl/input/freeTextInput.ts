import { CommonInput } from './commonInput.js'

export class FreeTextInput extends CommonInput<FreeTextInput> {
  constructor() {
    super()
  }

  public newInstance(): FreeTextInput {
    return new FreeTextInput()
  }
}
