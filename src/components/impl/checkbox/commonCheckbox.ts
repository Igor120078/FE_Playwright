import { CheckboxInterface } from '../../interfaces/checkboxInterface.js'
import { CommonComponent } from '../commonComponent.js'

export abstract class CommonCheckbox<C extends CommonCheckbox<C>>
  extends CommonComponent<C>
  implements CheckboxInterface
{
  protected isChecked: boolean = false

  constructor() {
    super()
  }

  abstract check(): Promise<CheckboxInterface>
  abstract uncheck(): Promise<CheckboxInterface>
  abstract newInstance(): CheckboxInterface

  setChecked(checked: boolean): CheckboxInterface {
    this.isChecked = checked
    return this
  }

  async applyCheckState(checkStateToApply: boolean): Promise<CheckboxInterface> {
    if (checkStateToApply === undefined) throw Error("Unable to set checkbox state to 'undefined'!")
    if (checkStateToApply) await this.check()
    if (!checkStateToApply) await this.uncheck()
    this.setChecked(checkStateToApply)
    return this
  }
}
