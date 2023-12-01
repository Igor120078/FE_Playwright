import { Checkbox } from '../impl/checkbox/checkbox.js'
import { WuiCheckbox } from '../impl/checkbox/wuiCheckbox.js'

export class CheckboxDelegate {
  public checkbox() {
    return new Checkbox()
  }
  public wuiCheckbox() {
    return new WuiCheckbox()
  }
}
