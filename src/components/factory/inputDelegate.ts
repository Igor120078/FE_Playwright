import { FreeTextInput } from '../impl/input/freeTextInput.js'
import { IntegerInput } from '../impl/input/integerInput.js'

export class InputDelegate {
  public freeTextInput() {
    return new FreeTextInput()
  }

  public integerInput() {
    return new IntegerInput()
  }
}
